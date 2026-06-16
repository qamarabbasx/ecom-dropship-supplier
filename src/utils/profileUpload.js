const baseUrl = process.env.REACT_APP_BASE_URL || "https://api.ecomdropship.ai/";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export const validateProfileImage = (file) => {
  if (!file) {
    return "No file selected";
  }
  if (!ALLOWED_TYPES.includes(file.type)) {
    return "Only JPG and PNG images are allowed";
  }
  if (file.size > MAX_SIZE_BYTES) {
    return "Image must be smaller than 5MB";
  }
  return null;
};

const uploadProfileImageToS3 = async (file) => {
  const validationError = validateProfileImage(file);
  if (validationError) {
    throw new Error(validationError);
  }

  const filename = encodeURIComponent(file.name);
  const contentType = encodeURIComponent(file.type);
  const presignedResponse = await fetch(
    `${baseUrl}users/generate-presigned-url?filename=${filename}&contentType=${contentType}`,
    { credentials: "include" }
  );

  if (!presignedResponse.ok) {
    const text = await presignedResponse.text();
    throw new Error(`Failed to get presigned URL: ${text}`);
  }

  const { url, key, publicUrl } = await presignedResponse.json();
  const uploadResponse = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!uploadResponse.ok) {
    throw new Error("Failed to upload profile image");
  }

  return { url: publicUrl || url.split("?")[0], key };
};

export default uploadProfileImageToS3;
