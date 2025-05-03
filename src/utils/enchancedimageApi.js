import axios from "axios";


const API_KEY= 'wxygpcf88b32jdqu2'
const BASE_URL = "https://techhk.aoscdn.com"
const MAX_RETRIES = 20;

export const enhancedImageAPI = async (file) => {
  // code to call API and get enhanced image URL

  try {
    const task_id = await uploadImage(file);
    console.log("image uploaded , TASK ID:", task_id);

    const enhancedImageData = await pollForEnhancedImage(task_id);
    console.log("Enhanced image data:", enhancedImageData);

    return enhancedImageData;
  } catch (error) {
    console.log("Error:", error);
  }

  console.log("API enhanced image", enhancedImageAPI);
};

const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image_file", file);

  const { data } = await axios.post(
    `${BASE_URL}/api/tasks/visual/scale`,

    formData,

    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-Key": API_KEY,
      },
    }
  );

  if (!data?.data?.task_id) {
    throw new Error("Failed to upload image! taskId not found in response.");
  }

  return data.data.task_id;
};

const fetchEnhancedImage = async (taskid) => {
  const { data } = await axios.get(
    `${BASE_URL}/api/tasks/visual/scale/${taskid}`,

    {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-API-Key": API_KEY,
      },
    }
  );

  if (!data?.data) {
    throw new Error(
      "Failed to fetch enhanced image! image not found in response."
    );
  }

  return data.data;
};

const pollForEnhancedImage = async (taskid, retries = 0) => {
  const result = await fetchEnhancedImage(taskid);

  if (result.state === 4) {
    console.log(`Processing... ${retries}/${MAX_RETRIES}`);

    if (retries >= MAX_RETRIES) {
      throw new Error("Max retries reached. Image processing failed.");
    }

    // wait for 2 seconds

    await new Promise((resolve) => setTimeout(resolve, 4000));

    return pollForEnhancedImage(taskid, retries + 1);
  }

  console.log("Enhnaced Image URL:", result);
  return result;
};
