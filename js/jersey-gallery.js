import '../css/jersey-gallery.css';

export function parseJerseyGallery(value, { strict = false } = {}) {
  if (!value) return [];
  try {
    const images = JSON.parse(value);
    if (!Array.isArray(images) || images.length > 5 || images.some(url => {
      if (typeof url !== 'string' || url.length > 2048) return true;
      try { return !['http:', 'https:'].includes(new URL(url).protocol); }
      catch { return true; }
    })) throw new Error('Daftar banner jersey tidak valid.');
    return images;
  } catch (error) {
    if (strict) throw error;
    console.warn('Galeri jersey tidak dapat dibaca:', error);
    return [];
  }
}

export function renderJerseyGallery(container, images) {
  container.replaceChildren();
  container.hidden = images.length === 0;
  if (!images.length) return;
  const gallery = document.createElement('div');
  gallery.className = 'jersey-gallery';
  const track = document.createElement('div');
  track.className = 'jersey-gallery-track';
  track.setAttribute('aria-label', 'Daftar gambar jersey');
  const dialog = document.createElement('dialog');
  dialog.className = 'jersey-gallery-dialog';
  dialog.setAttribute('aria-label', 'Pratinjau gambar jersey');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'jersey-gallery-close';
  close.setAttribute('aria-label', 'Tutup pratinjau gambar');
  close.textContent = '×';
  close.addEventListener('click', () => dialog.close());
  const fullImage = document.createElement('img');
  dialog.append(close, fullImage);
  images.forEach((url, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'jersey-gallery-slide';
    button.setAttribute('aria-label', `Perbesar banner jersey ${index + 1}`);
    const image = document.createElement('img');
    image.src = url;
    image.alt = `Banner jersey dan informasi ukuran ${index + 1}`;
    image.loading = 'lazy';
    const error = document.createElement('span');
    error.className = 'jersey-gallery-error';
    error.textContent = 'Gambar tidak dapat dimuat. Periksa tautan gambar.';
    error.hidden = true;
    image.addEventListener('error', () => { image.hidden = true; error.hidden = false; button.disabled = true; });
    button.addEventListener('click', () => {
      fullImage.src = url;
      fullImage.alt = image.alt;
      dialog.showModal();
    });
    button.append(image, error);
    track.append(button);
  });
  const hint = document.createElement('span');
  hint.className = 'jersey-gallery-hint';
  hint.textContent = 'Pilih gambar untuk memperbesar';
  gallery.append(track, hint, dialog);
  container.append(gallery);
}
