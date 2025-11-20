export const supabaseErrorMessages: Record<string, string> = {
  'Invalid login credentials': 'Credenciales inválidas',
  'User already registered': 'El usuario ya está registrado',
  'Password should be at least 6 characters': 'La contraseña debe tener al menos 6 caracteres',
  'Email not confirmed': 'El email no ha sido confirmado',
  'Email address is not valid': 'La dirección de correo no es válida',
  'Password is required': 'La contraseña es obligatoria',
  'Email is required': 'El correo electrónico es obligatorio',
  'Invalid password': 'Contraseña inválida',
  'User not found': 'Usuario no encontrado',
  'Token expired': 'El token ha expirado',
  'Invalid token': 'Token inválido',
  'Sign-in link expired': 'El enlace de inicio de sesión ha expirado',
  'Provider already linked': 'El proveedor ya está vinculado',
  'Cannot unlink the only provider': 'No se puede desvincular el único proveedor',
  'Duplicate key value violates unique constraint': 'Valor duplicado, ya existe un registro con ese dato',
  'Password should be at least 8 characters': 'La contraseña debe tener al menos 8 caracteres',
  'Password should contain at least one number': 'La contraseña debe contener al menos un número',
  'Password should contain at least one uppercase letter': 'La contraseña debe contener al menos una letra mayúscula',
  'Password should contain at least one lowercase letter': 'La contraseña debe contener al menos una letra minúscula',
  'Password should contain at least one special character': 'La contraseña debe contener al menos un carácter especial'
};

export const supabaseSignUpGenericMessage: string =
  'Se ha producido un error a la hora de crear la cuenta del usuario, por favor, intentelo mas tarde.';

export const supabaseSignInGenericMessage: string =
  'Se ha producido un error a la hora de iniciar sesión, por favor, intentelo mas tarde.';

export const supabaseForgotPasswordGenericMessage: string =
  'Se ha producido un error a la hora de enviar el correo electrónico para poder restablecer la contraseña, por favor, intentelo mas tarde.';

export const supabaseResetPasswordGenericMessage: string =
  'Se ha producido un error a la hora de restablecer la contraseña, por favor, intentelo mas tarde.';

export const supabaseGenericErrorMessage: string =
  'Ha ocurrido un error inesperado. Por favor, comprueba tu conexión a internet o inténtalo más tarde.';
