export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const jobId = "job_" + Date.now();

  global.jobs = global.jobs || {};

  global.jobs[jobId] = {
    progress: 0,
    status: "running",
  };

  return res.status(200).json({ jobId });
}
