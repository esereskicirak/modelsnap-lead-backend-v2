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

  if (!jobId || typeof jobId !== "string" || !jobId.startsWith("job_")) {
    return res.status(404).json({ error: "Job not found" });
  }

  const startedAt = Number(jobId.replace("job_", ""));

  if (!Number.isFinite(startedAt)) {
    return res.status(404).json({ error: "Job not found" });
  }

  const elapsedMs = Date.now() - startedAt;

  let progress = 0;
  if (elapsedMs >= 0) progress = 25;
  if (elapsedMs >= 1200) progress = 50;
  if (elapsedMs >= 2400) progress = 75;
  if (elapsedMs >= 3600) progress = 100;

  const status = progress >= 100 ? "completed" : "running";

  return res.status(200).json({
    jobId,
    status,
    progress,
    totalFound: progress >= 100 ? 2 : 1,
  });
}
