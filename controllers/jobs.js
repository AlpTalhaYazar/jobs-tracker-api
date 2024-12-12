const getAllJobs = async (req, res) => {
  res.send("All Jobs");
};

const getJobById = async (req, res) => {
  res.send("Single Job ${req.params.id}");
};

const createJob = async (req, res) => {
  res.send("Create Job");
};

const updateJob = async (req, res) => {
  res.send("Update Job ${req.params.id}");
};

const deleteJob = async (req, res) => {
  res.send("Delete Job ${req.params.id}");
};

export { getAllJobs, getJobById, createJob, updateJob, deleteJob };
