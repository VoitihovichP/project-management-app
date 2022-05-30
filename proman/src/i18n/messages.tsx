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
    // HEADER BURGER MENU
    BURGER_MENU_HEADER: 'Меню',
    BURGER_MENU_ITEM_1: 'Мои проекты',
    BURGER_MENU_ITEM_2: 'Новый проект',
    BURGER_MENU_ITEM_3: 'Мой профиль',
    BURGER_MENU_ITEM_4: 'О приложении',
    BURGER_MENU_ITEM_5: 'Выход',
    // MAIN
    EDIT_PROJECT: 'изменить',
    DELETE_PROJECT: 'удалить',
    // WELCOME
    MAIN_GREETING_1: 'Приветствуем Вас в новом приложении управления проектами',
    MAIN_GREETING_2: '!',
    MAIN_APP_DESCRIPTION_1:
      'Мы визуализируем процесс командной работы, позволяя участникам лучше обдумывать, планировать и реализовывать задачи, а также отмечать успехи. Наши инструменты интуитивно понятны и доступны из облака.',
    MAIN_APP_DESCRIPTION_2:
      'Приложение было разработано для Вас в ходе выполнения финального таска курса "React 2022 Q1" школы "The Rolling Scopes" студентами-разработчиками:',
    // WELCOME TEAM MEMBER CARD
    PAVEL_FULL_NAME: 'Павел Войтехович',
    PAVEL_TASKS:
      'Описание будет добавлено по завершению работы над проектом, а пока что этот текст для примера',
    PAVEL_GITHUB_LOGIN: 'VoitihovichP',
    PAVEL_GITHUB_URL: 'https://github.com/VoitihovichP',
    SERGEY_FULL_NAME: 'Сергей Козловский',
    SERGEY_TASKS:
      'Описание будет добавлено по завершению работы над проектом, а пока что этот текст для примера',
    SERGEY_GITHUB_LOGIN: 'SergeyKozlovskiy',
    SERGEY_GITHUB_URL: 'https://github.com/SergeyKozlovskiy',
    TIMUR_FULL_NAME: 'Тимур Щербина',
    TIMUR_TASKS:
      'Описание будет добавлено по завершению работы над проектом, а пока что этот текст для примера',
    TIMUR_GITHUB_LOGIN: 'Stellarator85',
    TIMUR_GITHUB_URL: 'https://github.com/Stellarator85',
    // AUTHORIZATION
    SIGN_IN_FORM_HEADER: 'АВТОРИЗАЦИЯ',
    SIGN_IN_FORM_BUTTON: 'Войти',
    SIGN_IN_FORM_LOGIN_ERROR: 'Длина имени должна быть от 4 до 12 символов',
    SIGN_IN_FORM_PASSWORD_ERROR: 'Длина имени должна быть от 4 до 8 символов',
    SIGN_IN_FORM_EMPTY_FIELD_ERROR: 'Поле должно быть заполнено',
    // REGISTRATION
    SIGN_UP_FORM_HEADER: 'Регистрация',
    SIGN_UP_FORM_BUTTON: 'Зарегистрироваться',
    SIGN_UP_FORM_USERNAME_PLACEHOLDER: 'Имя',
    SIGN_UP_FORM_USERNAME_ERROR: 'Длина имени должна быть от 3 до 12 символов',
    SIGN_UP_FORM_LOGIN_PLACEHOLDER: 'Логин',
    SIGN_UP_FORM_LOGIN_ERROR: 'Длина логина должна быть от 4 до 12 символов',
    SIGN_UP_FORM_PASSWORD_PLACEHOLDER: 'Пароль',
    SIGN_UP_FORM_PASSWORD_ERROR: 'Длина пароля должна быть от 4 до 8 символов',
    // AUTHORIZATION & REGISTRATION MODALS
    ERROR_TITLE: 'Ошибка!',
    ERROR_MESSAGE: 'Что то пошло не так...',
    SUCCESS_TITLE: 'Отлично!',
    SUCCESSFUL_REGISTRATION_MESSAGE: 'Вы успешно зарегестрировались!',
    SUCCESSFUL_LOGIN_MESSAGE: 'Рады снова видеть Вас!',
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
    // Board
    BOARD_ADD_TASK: 'Добавить задачу',
    BOARD_TASK_TITLE_PLACEHOLDER: 'Название задачи',
    BOARD_TASK_DESCRIPTION_PLACEHOLDER: 'Описание',
    BOARD_TASK_CREATE: 'Создать',
    BOARD_ADD_SECTION: 'Добавить секцию',
    // Modal
    DELETE_TASK_MODAL: 'Вы точно хотите удалить этот элемент? Это действие невозможно отменить!',
    DELETE_TASK_MODAL_OPTION1: 'Нет',
    DELETE_TASK_MODAL_OPTION2: 'Да',
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
    // HEADER BURGER MENU
    BURGER_MENU_HEADER: 'Menu',
    BURGER_MENU_ITEM_1: 'My Projects',
    BURGER_MENU_ITEM_2: 'Add Project',
    BURGER_MENU_ITEM_3: 'My Profile',
    BURGER_MENU_ITEM_4: 'About App',
    BURGER_MENU_ITEM_5: 'Log Out',
    // MAIN
    EDIT_PROJECT: 'edit',
    DELETE_PROJECT: 'delete',
    // WELCOME
    MAIN_GREETING_1: 'WELCOME TO ',
    MAIN_GREETING_2: ' - A NEW PROJECT-MANAGEMENT APP!',
    MAIN_APP_DESCRIPTION_1:
      'Our app helps you to visualize the process of teamwork. It allows the team-members to think, plan and implement tasks better, as well as to mark the achievements. Pro-Man tools are intuitive and accessible from the cloud.',
    MAIN_APP_DESCRIPTION_2:
      'The application was developed for you by the students of "The Rolling Scopes"-school as the final task of "React 2022 Q1"-course:',
    // WELCOME TEAM MEMBER CARD
    PAVEL_FULL_NAME: 'Pavel Voitihovich',
    PAVEL_TASKS:
      'Tasks fulfilled description will be added upon the end of the work. This text is here for now as an example.',
    PAVEL_GITHUB_LOGIN: 'VoitihovichP',
    PAVEL_GITHUB_URL: 'https://github.com/VoitihovichP',
    SERGEY_FULL_NAME: 'SergeyKozlovskiy',
    SERGEY_TASKS:
      'Tasks fulfilled description will be added upon the end of the work. This text is here for now as an example.',
    SERGEY_GITHUB_LOGIN: 'SergeyKozlovskiy',
    SERGEY_GITHUB_URL: 'https://github.com/SergeyKozlovskiy',
    TIMUR_FULL_NAME: 'Timur Scherbina',
    TIMUR_TASKS:
      'Tasks fulfilled description will be added upon the end of the work. This text is here for now as an example.',
    TIMUR_GITHUB_LOGIN: 'Stellarator85',
    TIMUR_GITHUB_URL: 'https://github.com/Stellarator85',
    // AUTHORIZATION
    SIGN_IN_FORM_HEADER: 'AUTHORIZATION',
    SIGN_IN_FORM_BUTTON: 'Sign In',
    SIGN_IN_FORM_LOGIN_ERROR: 'Login length must be between 4 and 12 characters',
    SIGN_IN_FORM_PASSWORD_ERROR: 'Password length must be between 4 and 8 characters',
    SIGN_IN_FORM_EMPTY_FIELD_ERROR: 'This field may not be blank',
    // REGISTRATION
    SIGN_UP_FORM_HEADER: 'Registration',
    SIGN_UP_FORM_BUTTON: 'Sign Up',
    SIGN_UP_FORM_USERNAME_PLACEHOLDER: 'Username',
    SIGN_UP_FORM_USERNAME_ERROR: 'Username length must be between 3 and 12 characters',
    SIGN_UP_FORM_LOGIN_PLACEHOLDER: 'Login',
    SIGN_UP_FORM_LOGIN_ERROR: 'Login length must be between 4 and 12 characters',
    SIGN_UP_FORM_PASSWORD_PLACEHOLDER: 'Password',
    SIGN_UP_FORM_PASSWORD_ERROR: 'Password length must be between 4 and 8 characters',
    // AUTHORIZATION & REGISTRATION MODALS
    ERROR_TITLE: 'Error!',
    ERROR_MESSAGE: 'Oops! Something Went Wrong...',
    SUCCESS_TITLE: 'Great!',
    SUCCESSFUL_REGISTRATION_MESSAGE: 'You have successfully registered!',
    SUCCESSFUL_LOGIN_MESSAGE: 'Glad to see you again!',
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
    // Board
    BOARD_ADD_TASK: 'Add Task',
    BOARD_TASK_TITLE_PLACEHOLDER: 'Task Title',
    BOARD_TASK_DESCRIPTION_PLACEHOLDER: 'Description',
    BOARD_TASK_CREATE: 'Create',
    BOARD_ADD_SECTION: 'Add Section',
    // Board Modal
    DELETE_TASK_MODAL: 'Do you really want to delete this item? This action cannot be undone!',
    DELETE_TASK_MODAL_OPTION1: 'No',
    DELETE_TASK_MODAL_OPTION2: 'Yes',
  },
};
