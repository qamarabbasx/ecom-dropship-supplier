
const baseUrl = process.env.REACT_APP_BASE_URL || "https://backend.ecomdropship.ai/"; //"http://localhost:8000/";


const uploadFileToS3 = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }
  const filename = encodeURIComponent(file.name);
  const presignedResponse = await fetch(
    `${baseUrl}products/generate-presigned-url?filename=${filename}`,
    { credentials: "include" }
  );
  if (!presignedResponse.ok) {
    const text = await presignedResponse.text();
    throw new Error(`Failed to get presigned URL: ${text}`);
  }
  const { url, key } = await presignedResponse.json();
  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });
  if (!uploadResponse.ok) {
    throw new Error("Failed to upload file to S3");
  }
  return { url: url.split("?")[0], key };
};

export default uploadFileToS3;
