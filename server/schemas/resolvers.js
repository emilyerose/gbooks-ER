const { Book, User } = require('../models');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
          },
    },
    Mutation: {
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
          },

        login: async (parent, { email, password }) => {
        const user = await User.findOne({ email });
    
        if (!user) {
            throw new AuthenticationError('No user found with this email address');
        }
        const correctPw = await user.isCorrectPassword(password);
        if (!correctPw) {
            throw new AuthenticationError('Incorrect credentials');
        }
        const token = signToken(user);
        return { token, user };
        },

        deleteBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user.userId },
                    { $pull: { savedBooks: { bookId: bookId } } },
                    { new: true }
                  );
                return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!');
          },

        saveBook: async (parent, {bookId, authors, description, image, link, title} , context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user.userId },
                    { $addToSet: { savedBooks: {bookId, authors, description, image, link, title} } },
                    { new: true, runValidators: true }
                  );
                  return updatedUser
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
}