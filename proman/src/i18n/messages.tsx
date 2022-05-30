import { LOCALES } from './locales';

export const messages = {
  [LOCALES.RUSSIAN]: {
    // HEADER
    SIGN_IN: 'Вход',
    SIGN_UP: 'Регистрация',
    MY_PROJECTS: 'Перейти к проектам',
    ADD_PROJECT: 'Добавить проект',
    EDIT_PROFILE: 'Редактировать профиль',
    LOG_OUT: 'Выйти',
    HELLO_USER: 'Здравствуйте,',
    EDIT_PROJECT: 'изменить',
    DELETE_PROJECT: 'удалить',
    // WELCOME
    MAIN_GREETING: 'Приветствуем Вас в новом приложении управления проектами',
    MAIN_APP_DESCRIPTION_1:
      'Мы визуализируем процесс командной работы, позволяя участникам лучше обдумывать, планировать и реализовывать задачи, а также отмечать успехи. Наши инструменты интуитивно понятны и доступны из облака.',
    MAIN_APP_DESCRIPTION_2:
      'Приложение было разработано для Вас в ходе выполнения финального таска курса "React 2022 Q1" школы "The Rolling Scopes" студентами-разработчиками:',
    // AUTHORIZATION
    SIGN_IN_FORM_HEADER: 'АВТОРИЗАЦИЯ',
    SIGN_IN_FORM_BUTTON: 'Войти',
    SIGN_IN_FOR_LOGIN_ERROR: 'Длина имени должна быть от 4 до 12 символов',
    SIGN_IN_FOR_PASSWORD_ERROR: 'Длина имени должна быть от 4 до 8 символов',
    // REGISTRATION
    SIGN_UP_FORM_HEADER: 'Регистрация',
    SIGN_UP_FORM_BUTTON: 'Зарегистрироваться',
    SIGN_UP_FORM_USERNAME_PLACEHOLDER: 'Имя',
    SIGN_UP_FORM_USERNAME_ERROR: 'Длина имени должна быть от 3 до 12 символов',
    SIGN_UP_FORM_LOGIN_PLACEHOLDER: 'Логин',
    SIGN_UP_FORM_LOGIN_ERROR: 'Длина логина должна быть от 4 до 12 символов',
    SIGN_UP_FORM_PASSWORD_PLACEHOLDER: 'Пароль',
    SIGN_UP_FORM_PASSWORD_ERROR: 'Длина пароля должна быть от 4 до 8 символов',
    // ERROR
    ERROR_PAGE_DESCRIPTION_1: 'Страница не найдена',
    ERROR_PAGE_DESCRIPTION_2: 'Что-то пошло не так...',
    // Profile
    PROFILE_HEADER: 'Редактировать профиль',
    PROFILE_USERNAME_PLACEHOLDER: 'Введите Ваше новое имя',
    PROFILE_LOGIN_PLACEHOLDER: 'Введите Ваш новый логин',
    PROFILE_PASSWORD_PLACEHOLDER: 'Введите Ваш новый пароль',
    PROFILE_SAVE_BUTTON: 'Сохранить изменения',
    PROFILE_DELETE_BUTTON: 'Удалить аккаунт',
  },
  [LOCALES.ENGLISH]: {
    // HEADER
    SIGN_IN: 'Sign In',
    SIGN_UP: 'Sign Up',
    MY_PROJECTS: 'My projects',
    ADD_PROJECT: 'Add Project', // Also for MAIN
    EDIT_PROFILE: 'Edit Profile',
    LOG_OUT: 'Log Out',
    HELLO_USER: 'Hello',
    // MAIN
    EDIT_PROJECT: 'edit',
    DELETE_PROJECT: 'delete',
    // WELCOME
    MAIN_GREETING: 'WELCOME TO A NEW PROJECT-MANAGEMENT APP',
    MAIN_APP_DESCRIPTION_1:
      'Our app helps you to visualize the process of teamwork. It allows the team-members to think, plan and implement tasks better, as well as to mark the achievements. Pro-Man tools are intuitive and accessible from the cloud.',
    MAIN_APP_DESCRIPTION_2:
      'The application was developed for you by the students of "The Rolling Scopes"-school as the final task of "React 2022 Q1"-course:',
    // AUTHORIZATION
    SIGN_IN_FORM_HEADER: 'AUTHORIZATION',
    SIGN_IN_FORM_BUTTON: 'Sign In',
    SIGN_IN_FOR_LOGIN_ERROR: 'Login length must be between 4 and 12 characters',
    SIGN_IN_FOR_PASSWORD_ERROR: 'Password length must be between 4 and 8 characters',
    // REGISTRATION
    SIGN_UP_FORM_HEADER: 'Registration',
    SIGN_UP_FORM_BUTTON: 'Sign Up',
    SIGN_UP_FORM_USERNAME_PLACEHOLDER: 'Username',
    SIGN_UP_FORM_USERNAME_ERROR: 'Username length must be between 3 and 12 characters',
    SIGN_UP_FORM_LOGIN_PLACEHOLDER: 'Login',
    SIGN_UP_FORM_LOGIN_ERROR: 'Login length must be between 4 and 12 characters',
    SIGN_UP_FORM_PASSWORD_PLACEHOLDER: 'Password',
    SIGN_UP_FORM_PASSWORD_ERROR: 'Password length must be between 4 and 8 characters',
    // ERROR
    ERROR_PAGE_DESCRIPTION_1: 'Page Not Found',
    ERROR_PAGE_DESCRIPTION_2: 'Oops! Something Went Wrong...',
    // Profile
    PROFILE_HEADER: 'Edit Profile',
    PROFILE_USERNAME_PLACEHOLDER: 'Enter new username',
    PROFILE_LOGIN_PLACEHOLDER: 'Enter new login',
    PROFILE_PASSWORD_PLACEHOLDER: 'Enter new password',
    PROFILE_SAVE_BUTTON: 'Save Changes',
    PROFILE_DELETE_BUTTON: 'Delete Account',
  },
};
