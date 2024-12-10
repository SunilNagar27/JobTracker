const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   title: { type: String, required: true },
//   company: { type: String, required: true },
//   status: { type: String, enum: ["Applied", "Interviewing", "Offered", "Rejected"], default: "Applied" },
// });

// module.exports = mongoose.model("Job", jobSchema);


const jobSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    status: { type: String, enum: ["Applied", "Interviewing", "Offered", "Rejected"], default: "Applied" },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt` fields
);

module.exports = mongoose.model("Job", jobSchema);
