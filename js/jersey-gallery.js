import '../css/jersey-gallery.css';

export function isValidGalleryImageUrl(value) {
  if (typeof value !== 'string' || value.length > 2048) return false;
  try { return ['http:', 'https:'].includes(new URL(value).protocol); }
  catch { return false; }
}

export function parseJerseyGallery(value, { strict = false } = {}) {
  if (!value) return [];
  try {
    const images = JSON.parse(value);
    if (!Array.isArray(images) || images.length > 5 || images.some(url => !isValidGalleryImageUrl(url))) {
      throw new Error('Daftar banner jersey tidak valid.');
    }
    return images;
  } catch (error) {
    if (strict) throw error;
    console.warn('Galeri jersey tidak dapat dibaca:', error);
    return [];
  }
}

export function renderJerseyGallery(container, images, { subject = 'jersey', description = 'Banner jersey dan informasi ukuran' } = {}) {
  container.replaceChildren();
  container.hidden = images.length === 0;
  if (!images.length) return;
  const gallery = document.createElement('div');
  gallery.className = 'jersey-gallery';
  const track = document.createElement('div');
  track.className = 'jersey-gallery-track';
  track.setAttribute('aria-label', `Daftar gambar ${subject}`);
  const dialog = document.createElement('dialog');
  dialog.className = 'jersey-gallery-dialog';
  dialog.setAttribute('aria-label', `Pratinjau gambar ${subject}`);
  const toolbar = document.createElement('div');
  toolbar.className = 'jersey-gallery-toolbar';
  const title = document.createElement('span');
  title.className = 'jersey-gallery-dialog-title';
  title.textContent = `Pratinjau ${subject}`;
  const counter = document.createElement('span');
  counter.className = 'jersey-gallery-counter';
  counter.setAttribute('aria-live', 'polite');
  const close = document.createElement('button');
  close.type = 'button';
  close.className = 'jersey-gallery-close';
  close.setAttribute('aria-label', 'Tutup pratinjau gambar');
  close.textContent = '×';
  close.addEventListener('click', () => dialog.close());
  toolbar.append(title, counter, close);
  const stage = document.createElement('div');
  stage.className = 'jersey-gallery-stage';
  const fullImage = document.createElement('img');
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.className = 'jersey-gallery-nav is-previous';
  previous.setAttribute('aria-label', 'Gambar sebelumnya');
  const next = document.createElement('button');
  next.type = 'button';
  next.className = 'jersey-gallery-nav is-next';
  next.setAttribute('aria-label', 'Gambar berikutnya');
  let activeIndex = 0;
  const fitPreview = () => {
    if (!fullImage.naturalWidth || !fullImage.naturalHeight) return;

    const dialogStyle = getComputedStyle(dialog);
    const toolbarHeight = toolbar.getBoundingClientRect().height;
    const horizontalSpace = parseFloat(dialogStyle.paddingLeft) + parseFloat(dialogStyle.paddingRight)
      + parseFloat(dialogStyle.borderLeftWidth) + parseFloat(dialogStyle.borderRightWidth);
    const verticalSpace = parseFloat(dialogStyle.paddingTop) + parseFloat(dialogStyle.paddingBottom)
      + parseFloat(dialogStyle.borderTopWidth) + parseFloat(dialogStyle.borderBottomWidth);
    const isMobile = window.innerWidth <= 600;
    const maxDialogWidth = isMobile ? window.innerWidth - 16 : Math.min(window.innerWidth * 0.94, 1280);
    const maxDialogHeight = isMobile ? window.innerHeight - 16 : Math.min(window.innerHeight * 0.9, 900);
    const maxImageWidth = Math.max(1, maxDialogWidth - horizontalSpace);
    const maxImageHeight = Math.max(1, maxDialogHeight - verticalSpace - toolbarHeight);
    const scale = Math.min(1, maxImageWidth / fullImage.naturalWidth, maxImageHeight / fullImage.naturalHeight);
    const width = Math.max(1, Math.floor(fullImage.naturalWidth * scale));
    const height = Math.max(1, Math.floor(fullImage.naturalHeight * scale));

    stage.style.width = `${width}px`;
    stage.style.height = `${height}px`;
    fullImage.style.width = `${width}px`;
    fullImage.style.height = `${height}px`;
    dialog.style.width = `${width + horizontalSpace}px`;
    dialog.style.height = `${height + toolbarHeight + verticalSpace}px`;
    fullImage.classList.remove('is-changing');
  };
  const showImage = index => {
    activeIndex = (index + images.length) % images.length;
    fullImage.classList.add('is-changing');
    fullImage.src = images[activeIndex];
    fullImage.alt = `${description} ${activeIndex + 1}`;
    counter.textContent = `${activeIndex + 1} / ${images.length}`;
  };
  previous.addEventListener('click', () => showImage(activeIndex - 1));
  next.addEventListener('click', () => showImage(activeIndex + 1));
  fullImage.addEventListener('load', fitPreview);
  window.addEventListener('resize', fitPreview);
  stage.append(fullImage, previous, next);
  dialog.append(toolbar, stage);
  images.forEach((url, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'jersey-gallery-slide';
    button.setAttribute('aria-label', `Perbesar gambar ${subject} ${index + 1}`);
    const image = document.createElement('img');
    image.src = url;
    image.alt = `${description} ${index + 1}`;
    image.loading = 'lazy';
    const error = document.createElement('span');
    error.className = 'jersey-gallery-error';
    error.textContent = 'Gambar tidak dapat dimuat. Periksa tautan gambar.';
    error.hidden = true;
    image.addEventListener('error', () => { image.hidden = true; error.hidden = false; button.disabled = true; });
    button.addEventListener('click', () => {
      showImage(index);
      dialog.showModal();
    });
    button.append(image, error);
    track.append(button);
  });
  dialog.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  const hint = document.createElement('span');
  hint.className = 'jersey-gallery-hint';
  hint.textContent = 'Pilih gambar untuk memperbesar';
  gallery.append(track, hint, dialog);
  container.append(gallery);
}
