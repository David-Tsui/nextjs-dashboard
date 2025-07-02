'use server';

export async function validateCaptchaAction(
  token: string | undefined,
  formData: FormData,
): Promise<{
  success: boolean;
  message: string;
}> {
  if (!token) {
    return {
      success: false,
      message: 'Captcha token is missing',
    }
  }

  // check if the token is valid by google site verify
  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        secret: process.env.CAPTCHA_SECRET_KEY || '',
        response: token,
        remoteip: formData.get('remoteip') as string || '', // Optional, can be used to verify the user's IP
      }),
    }
  )

  const captchaData = await response.json();

  if (!captchaData.success) {
    return {
      success: false,
      message: `Captcha validation failed: ${captchaData['error-codes']?.join(', ')}`,
    }
  }

  return {
    success: true,
    message: 'Captcha token is valid',
  }
}
