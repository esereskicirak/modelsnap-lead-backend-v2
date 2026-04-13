export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { jobId } = req.query;

  global.jobs = global.jobs || {};
  const job = global.jobs[jobId];

  if (!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  job.progress += 25;

  if (job.progress >= 100) {
    job.progress = 100;
    job.status = "completed";
  }

  return res.status(200).json({
    jobId,
    status: job.status,
    progress: job.progress,
    totalFound: job.progress >= 100 ? 5 : 1,
  });
}
