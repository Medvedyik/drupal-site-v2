const form = document.querySelector('#support-form');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // без перезагрузки

    const formData = new FormData(form);

    try {
      const response = await fetch(
        'https://formspree.io/f/xqezgegp', // Formspree endpoint
        {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (response.ok) {
        alert('Заявка отправлена!');
        form.reset();
      } else {
        alert('Ошибка при отправке формы');
      }
    } catch (error) {
      alert('Ошибка сети');
    }
  });
}
