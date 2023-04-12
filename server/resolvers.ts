import Post from "./models/Post.model";
import Person from "./models/Person.model";
import Address from "./models/Address.model";
import mongoose, { isValidObjectId } from "mongoose";
import { ObjectId } from "bson";

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World!";
    },
    getAllPosts: async () => {
      return await Post.find({});
    },
    getPostById: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      return await Post.findById(id);
    },
    getPersonById: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      return await Person.findById(id);
    },
    getAllPeople: async () => {
      const people = await Person.find({}).populate({
        path: "addresses",
        select: { id: 1, address: 1, persons: 1 },
        populate: {
          path: "persons",
          select: { id: 1, name: 1, age: 1, email: 1, phone: 1, image: 1 },
        },
      });
      return people;
    },
    getAllAddresses: async () => {
      return await Address.find({}).populate("persons", {
        id: 1,
        name: 1,
        age: 1,
        email: 1,
        phone: 1,
        image: 1,
      });
    },
  },
  Mutation: {
    createPost: async (parent: any, args: any, context: any, info: any) => {
      const { title, description } = args.post;
      const post = new Post({ title, description });
      await post.save();
      return post;
    },
    deletePost: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      await Post.findByIdAndDelete(id);
      return `Ok - post with id ${id} was successfully deleted`;
    },
    updatePost: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      const { title, description } = args.post;
      type post = {
        title?: String;
        description?: String;
      };
      const updatedPost: post = {};
      if (title !== undefined) {
        updatedPost.title = title;
      }
      if (description !== undefined) {
        updatedPost.description = description;
      }

      const post = await Post.findByIdAndUpdate(id, updatedPost, { new: true });
      return post;
    },
    createPerson: async (parent: any, args: any, context: any, info: any) => {
      const { name, age, email, address, phone, image, addressIds } = args.person;
      const person = new Person({
        name,
        age,
        email,
        address,
        phone,
        image,
        addresses: addressIds || [],
      });
      await person.save();
      return person;
    },
    updatePerson: async (_parent: any, args: any, _context: any, _info: any) => {
      const id = args.id;
      const { name, age, email, address, phone, image } = args.person;
      type person = {
        name?: String;
        age?: Number;
        email?: String;
        address?: String;
        phone?: String;
        image?: String;
      };
      const updatedPost: person = {};
      if (name !== undefined) {
        updatedPost.name = name;
      }
      if (age !== undefined) {
        updatedPost.age = age;
      }
      if (email !== undefined) {
        updatedPost.email = email;
      }
      if (address !== undefined) {
        updatedPost.address = address;
      }
      if (phone !== undefined) {
        updatedPost.phone = phone;
      }
      if (image !== undefined) {
        updatedPost.image = image;
      }

      const person = await Person.findByIdAndUpdate(id, updatedPost, { new: true });
      return person;
    },
    deletePerson: async (_parent: any, args: any, _context: any, _info: any) => {
      try {
        const id = args.id;
        const deletedPerson = await Person.findByIdAndDelete(id);
        if (!deletedPerson) {
          throw new Error("Person not found");
        }

        // delete all associated addresses - maybe this is unnecessary
        await Address.deleteMany({ persons: deletedPerson._id });

        return `Ok - person with id ${id} was successfully deleted`;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    createAddress: async (parent: any, args: any, context: any, info: any) => {
      const { address } = args.address;
      const newAddress = new Address({ address });
      await newAddress.save();
      return newAddress;
    },
    addPersonToAddress: async (parent: any, args: any, context: any, info: any) => {
      const { personId, addressId } = args;

      if (
        !mongoose.Types.ObjectId.isValid(personId) ||
        !mongoose.Types.ObjectId.isValid(addressId)
      ) {
        throw new Error("Invalid person or address ID");
      }

      const person = await Person.findById(personId);
      const address = await Address.findById(addressId);

      if (!person || !address) {
        throw new Error("Invalid person or address ID");
      }

      // add person to address but also address to person!!
      address.persons.push(personId);
      await address.save();

      person.addresses.push(addressId);
      await person.save();

      // convert the Buffer object to string before returning
      const newAddress = await Address.findById(addressId).populate("persons");

      if (newAddress !== null) {
        newAddress.persons = newAddress.persons.map((person: any) => {
          person.id = person.id.toString();
          return person;
        });
      } else {
        throw new Error("Failed to add person to address");
      }

      return newAddress;
    },
    removePersonFromAddress: async (_parent: any, args: any, _context: any, _info: any) => {
      const { personId, addressId } = args;

      if (!validateId(personId) || !validateId(addressId)) {
        throw new Error("Invalid person or address ID");
      }

      const person = await Person.findById(personId);
      const address = await Address.findById(addressId);

      if (!person || !address) {
        throw new Error("Invalid person or address ID");
      }

      // remove from person and from address
      if (person?.addresses.some((address) => address.equals(new ObjectId(addressId)))) {
        person.addresses = person.addresses.filter(
          (address) => !address.equals(new ObjectId(addressId))
        );
      }

      if (address.persons.some((person) => person.equals(new ObjectId(personId)))) {
        address.persons = address.persons.filter(
          (person) => !person.equals(new ObjectId(personId))
        );
      }

      await address.save();
      await person.save();

      const newAddress = await Address.findById(addressId).populate("persons");

      if (newAddress !== null) {
        newAddress.persons = newAddress.persons.map((person: any) => {
          person.id = person.id.toString();
          return person;
        });
      } else {
        throw new Error("Failed to add person to address");
      }

      return newAddress;
    },
  },
  Subscription: {
    personCreated: {},
    personUpdated: {},
    personDeleted: {},
  },
};

const validateId = (id: any) => {
  return mongoose.Types.ObjectId.isValid(id);
};

export default resolvers;
