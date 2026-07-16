const mongoose = require('mongoose');

// Connect to MongoDB
const connectDB = async () => {
  // Disable buffering so that operations fail fast if the DB is not connected
  mongoose.set('bufferCommands', false);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 seconds timeout
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.log('Server will continue running in limited mode (DB unavailable).');
  }
};

// --- Mongoose Schemas & Models ---

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  memberSince: { type: String }
}, { timestamps: true });

// Cascade delete related records on User deletion
userSchema.pre('findOneAndDelete', async function(next) {
  const userId = this.getQuery()._id;
  if (userId) {
    await mongoose.model('Transaction').deleteMany({ userId });
    await mongoose.model('BudgetGoal').deleteMany({ userId });
  }
  next();
});

userSchema.pre('deleteOne', { document: false, query: true }, async function(next) {
  const userId = this.getQuery()._id;
  if (userId) {
    await mongoose.model('Transaction').deleteMany({ userId });
    await mongoose.model('BudgetGoal').deleteMany({ userId });
  }
  next();
});

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true, enum: ['income', 'expense'] },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  icon: { type: String },
  color: { type: String },
  time: { type: String }
}, { timestamps: true });

const budgetGoalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  currentAmount: { type: Number, default: 0 },
  targetAmount: { type: Number, required: true },
  deadline: { type: String, required: true },
  color: { type: String }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const BudgetGoal = mongoose.model('BudgetGoal', budgetGoalSchema);

module.exports = {
  connectDB,
  User,
  Transaction,
  BudgetGoal
};
