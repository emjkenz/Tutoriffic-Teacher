
const { Quiz, Questions, User, Lesson, Post,Student, Grade } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
  quizzes: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view your lessons.');
      }

      const userQuizzes = await Quiz.find({ createdBy: user._id });

      return userQuizzes;
    },
    quiz: async (parent, { id }) => {
      const foundQuiz = await Quiz.findOne({ id: id });
      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }
      return foundQuiz;
    },
    lessons: async (parent, args, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to view your lessons.');
      }

      const userLessons = await Lesson.find({ createdBy: user._id });

      return userLessons;
    },
    lesson: async (parent, { id }) => {

      const foundLesson = await Lesson.findOne({ id: id });

      if (!foundLesson) {
        throw new Error('Cannot find a lesson with this id!');
      }

      return foundLesson;
    },
    posts: async () => {

      return await Post.find();
    },
    post: async (parent, { id }) => {

      const foundPost = await Post.findOne({ id: id });

      if (!foundPost) {
        throw new Error('Cannot find a post with this id!');
      }

      return foundPost;
    },
    commentsByPostId: async (parent, { postId }) => {
        return await Comments.find({ postId });
    },
      
    students: async () => {
      return await Student.find();
    },
    grades: async () => {
      return await Grade.find();
    },
    users: async () => {
      return User.find();
    },
    loggedInUser: async (parent, args, { user }) => {
      if (!user) {
        return null;
      }
      return user;
    },
  },
  Mutation: {
    saveQuiz: async (parent, { quizData }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a quiz.');
      }

      const { id, title, description, date, questions } = quizData;

      return await Quiz.create({
        id,
        title,
        description,
        date,
        questions,
        createdBy: user._id
      })
    }, 
    removeQuiz: async (parent, { id }) => {
      const foundQuiz = await Quiz.findOne({ id: id });
      if (!foundQuiz) {
        throw new Error('Cannot find a quiz with this id!');
      }
      
      const { title, questions, date } = foundQuiz;

      await Quiz.deleteOne({ id });

      return { id, title, description: foundQuiz.description, date, questions };

    },
    saveLesson: async (parent, { lessonData }, { user }) => {
      const { id, title, date, sections } = lessonData;

      return await Lesson.create({
        id,
        title,
        date,
        sections,
        createdBy: user._id,
      })
    },
    removeLesson: async (parent, { id }) => {
      const foundLesson = await Lesson.findOne({ id: id });

      if (!foundLesson) {
        throw new Error('Cannot find a lesson with this id!');
      }

      const { title, sections } = foundLesson;

      await Lesson.deleteOne({ id });

      return { id, title, sections };
    },
    savePost: async (parent, { postData }, { user }) => {
      if (!user) {
        throw new AuthenticationError('You must be logged in to create a post.');
      }

      const { id, title, text } = postData;

      return await Post.create({
        id,
        title,
        text,
        createdBy: user._id
      });
    },
    removePost: async (parent, { id }) => {
      const foundPost = await Post.findOne({ id: id });

      if (!foundPost) {
        throw new Error('Cannot find a post with this id!');
      }

      const { title, text, comments } = foundPost;

      await Post.deleteOne({ id });

      return { id, title, text, comments };
    },
    addCommentToPost: async (parent, { postId, comment }) => {
      try {
        const post = await Post.findOne({ id: postId });
        if (!post) {
          throw new Error('Post not found');
        }

        const newComment = {
          text: comment.text,
        };

        post.comments.push(newComment);
        await post.save();

        return post;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    removeCommentFromPost: async(parent, {postId, commentId}) => {
        const updatedPost = await Post.findOneAndUpdate(
        { id: postId },
        { $pull: { comments: { _id: commentId } } },
        { new: true }
      );

      if (!updatedPost) {
        throw new AuthenticationError("Couldn't find comment with this id!");
      }

      return updatedPost;
    },
    createUser: async (parent, { firstName, lastName, email, password }) => {

      const user = await User.create({ firstName, lastName, email, password });
      const token = signToken(user);

      return { token, user };
    },
    loginUser: async (parent, { email, password }) => {
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
  },
};

module.exports = resolvers;


