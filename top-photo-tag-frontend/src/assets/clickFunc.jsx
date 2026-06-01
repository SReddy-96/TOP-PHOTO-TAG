// Find out where the user has clicked on the image in pixel co-ordinates then convert to percentage
export default function clickFunc(imageId, event) {
  const image = document.getElementById(imageId);
  if (!image || !event) {
    return { x: null, y: null };
  }

  const rect = image.getBoundingClientRect();

  const x = ((event.clientX - rect.left) / rect.width) * 100;
  const y = ((event.clientY - rect.top) / rect.height) * 100;

  return { x, y };
}
