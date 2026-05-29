export default function clickFunc(imageId, event) {
  const image = document.getElementById(imageId);
  if (!image || !event) {
    return { x: null, y: null };
  }

  const rect = image.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x, y };
}
