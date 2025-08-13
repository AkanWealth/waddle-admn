export const getFileType = (url: string) => {
  console.log(url, "This is the url");
  const ext = url?.split(".").pop()?.toLowerCase() ?? "";
  console.log(ext, "This is the url extension of this stuff");
  if (ext === "pdf") return "PDF";
  if (ext === "doc" || ext === "docx") return "DOC";
  if (ext === "xls" || ext === "xlsx") return "XLS";
  if (ext === "ppt" || ext === "pptx") return "PPT";
  if (ext === "jpg" || ext === "jpeg") return "JPG";
  if (ext === "png") return "PNG";
  return "";
};
