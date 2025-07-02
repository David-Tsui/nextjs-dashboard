export const getCaptchaToken = async () => {
  if (typeof window === 'undefined') {
    throw new Error('Captcha can only be used in the browser');
  }

  // Ensure the reCAPTCHA script is loaded
  if (!grecaptcha) {
    throw new Error('reCAPTCHA script not loaded');
  }

  return new Promise<string>((resolve, reject) => {
    grecaptcha.enterprise.ready(() => {
      const promise = grecaptcha.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
        { action: 'login' }
      ) as Promise<string>;

      promise.then((token: string) => {
        if (token) {
          resolve(token);
        } else {
          resolve('');
        }
      }).catch((error: Error) => {
        reject(error);
      });
    });
  });
}
