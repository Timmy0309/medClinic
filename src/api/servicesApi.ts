import { Service, ServiceCategory, ServiceFilters } from '../types/services';

// Задержка для имитации реального API
const DELAY = 500;

// Мок-данные для категорий услуг
const mockCategories: ServiceCategory[] = [
  {
    id: '1',
    name: 'Терапия',
    description: 'Общие медицинские услуги для диагностики и лечения заболеваний',
    icon: 'stethoscope',
  },
  {
    id: '2',
    name: 'Стоматология',
    description: 'Услуги по лечению зубов и полости рта',
    icon: 'tooth',
  },
  {
    id: '3',
    name: 'Офтальмология',
    description: 'Диагностика и лечение заболеваний глаз',
    icon: 'eye',
  },
  {
    id: '4',
    name: 'Неврология',
    description: 'Диагностика и лечение заболеваний нервной системы',
    icon: 'brain',
  },
  {
    id: '5',
    name: 'Лабораторные исследования',
    description: 'Анализы крови, мочи и другие диагностические тесты',
    icon: 'flask',
  },
];

// Мок-данные для услуг
const mockServices: Service[] = [
  {
    id: '1',
    name: 'Первичный прием терапевта',
    description: 'Консультация врача-терапевта, сбор анамнеза, осмотр, назначение необходимых исследований и лечения.',
    price: 2500,
    duration: 30,
    categoryId: '1',
    category: 'Терапия',
    image: 'https://klinik.by/wp-content/uploads/2020/11/Konsultaciya-vracha-kardiologa.jpg',
  },
  {
    id: '2',
    name: 'Повторный прием терапевта',
    description: 'Повторная консультация терапевта для оценки эффективности лечения и коррекции назначений.',
    price: 2000,
    duration: 20,
    categoryId: '1',
    category: 'Терапия',
    image: 'https://mogilev.biz/netcat_files/2582/3512/papilloma_na_veke_prichiny_vozniknoveniya_diagnostika_i_lechenie.jpg',
  },
  {
    id: '3',
    name: 'Чистка зубов ультразвуком',
    description: 'Профессиональная чистка зубов ультразвуком для удаления зубного камня и налета.',
    price: 5000,
    duration: 60,
    categoryId: '2',
    category: 'Стоматология',
    image: 'https://yandex-images.clstorage.net/f9uH8q357/da2089Dta/EW3l1hqVzvGO25Df3Kl_SgO7lagVb9ZrL8GiL8xC-P0NpBUDKqgWuDtp_h2m_AKCfp7CwUkCexX1obYDRXgKTlU1of8uyKvI09OZxvTxTgMfv-GIbU_-PhMFSvp01hAQ8WSZmq-VU9VOOPpo0-D7Pj9_x9QUh4L4cCH6zwBws8ZZCSyvC3WKNbKzGItdSVNykuepgJ1PnlYzSSp2ZPrwuFkAnap3SX_19oyzNMO80-cPGxsMUHM-sDQJ6tvI8BPeYQUAE3dhhqUm4wjXpYnjvgKnKTT9U46ex7UORrB2CKgdKEGiB7ETUQ78r3RTsAv7j5_bECC3ImT8UXIHJISDxoWxHHsfNWr1AjO0K4mJd0Lma9nkSbvaEn_FOkosGgwU2SDVjtORY_k2hEf8A4jTj5vjqzDo6_ZQCIkuk4j8fwZtfUzXB_0WkUJLAD-h2S_SAkfdzJnzKmof1Yq65FZUnOFY7W7HQY-JGhRPfA8wM0-fe09YnDuiOGQNmq8MoLtK8RV427txghE6z1DX2UErZooPdYwhc9KCJx0OdnwCXCiFDMmimylTaeIkr8iTKKsPa3sv4FgHvuyk7W7j3EDTamk5lA_vDX61GqfEx0VZh37yo7lsubeOStfVYjawNlRIEZBlJrvlT1XCANcIC5gfI3uDk6w0YwbIYC2GW2yMw76ReZwPR3kWHbbLIDtBvQMSEtOl7GGbko7fcZqaMNKw6AEc3Xa3lV-NgvgPxLMQz48n87uEpOtSSOB1ZpeU4H_aKRnsCzs9BklCWxx_ybXX6hY3pUSR3-aSG92yVhAapHBdfOXu_0H3oRakV-gT1Dv7e09TtGTfAtQgod4_AHCvbp39GPsPdR6B3teYd61dX-4SE0nsZZsCWj9hmqr48tC0ZSgJWo_Jz4kO5Jd8_wBTT1dT64Rsq2o8BPkuz-QYp6ZVKYAfE42q9UZPPAOpFdNC6i9tDBnTquqDqTL23Dp4',
  },
  {
    id: '4',
    name: 'Лечение кариеса',
    description: 'Лечение кариеса с установкой современной светоотверждаемой пломбы.',
    price: 4500,
    duration: 45,
    categoryId: '2',
    category: 'Стоматология',
    image: 'https://avatars.mds.yandex.net/get-tycoon/5395686/2a0000017f413784058ad39aa1e0f171576a/priority-product-x-large',
  },
  {
    id: '5',
    name: 'Проверка зрения',
    description: 'Комплексная проверка зрения с использованием современного оборудования.',
    price: 2000,
    duration: 30,
    categoryId: '3',
    category: 'Офтальмология',
    image: 'https://i.pinimg.com/736x/2c/eb/b4/2cebb4172b5f4801ec4037d48736b911.jpg',
  },
  {
    id: '6',
    name: 'Подбор очков или контактных линз',
    description: 'Индивидуальный подбор очков или контактных линз по результатам диагностики.',
    price: 1500,
    duration: 45,
    categoryId: '3',
    category: 'Офтальмология',
    image: 'https://sneg.top/uploads/posts/2023-04/1681537441_sneg-top-p-okulist-kartinka-dlya-detei-instagram-56.jpg',
  },
  {
    id: '7',
    name: 'Консультация невролога',
    description: 'Первичная консультация врача-невролога с осмотром и назначением лечения.',
    price: 3500,
    duration: 40,
    categoryId: '4',
    category: 'Неврология',
    image: 'https://avatars.mds.yandex.net/get-altay/13289089/2a000001936e0b5a5fb9908297707c777133/XXXL',
  },
  {
    id: '8',
    name: 'Общий анализ крови',
    description: 'Общий клинический анализ крови с лейкоцитарной формулой.',
    price: 800,
    duration: 10,
    categoryId: '5',
    category: 'Лабораторные исследования',
    image: 'https://p2.zoon.ru/f/c/5260f85e40c0882b768b8bbd_636c57b7a26383.80808322.jpg',
  },
  {
    id: '9',
    name: 'Биохимический анализ крови',
    description: 'Расширенный биохимический анализ крови (до 10 показателей).',
    price: 2500,
    duration: 10,
    categoryId: '5',
    category: 'Лабораторные исследования',
    image: 'https://s0.rbk.ru/v6_top_pics/media/img/7/44/756385298912447.jpg',
  },
  {
    id: '10',
    name: 'ЭКГ с расшифровкой',
    description: 'Электрокардиография с расшифровкой и заключением врача-кардиолога.',
    price: 1800,
    duration: 20,
    categoryId: '1',
    category: 'Терапия',
    image: 'https://s-medic.ru/wp-content/uploads/2023/05/ekg.jpg',
  },
];

export const servicesApi = {
  getServices: async (filters: ServiceFilters): Promise<Service[]> => {
    // Имитация задержки сервера
    await new Promise((resolve) => setTimeout(resolve, DELAY));
    
    let filteredServices = [...mockServices];
    
    // Фильтрация по категории
    if (filters.category) {
      filteredServices = filteredServices.filter(
        (service) => service.categoryId === filters.category
      );
    }
    
    // Фильтрация по поисковому запросу
    if (filters.searchTerm) {
      const searchTermLower = filters.searchTerm.toLowerCase();
      filteredServices = filteredServices.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTermLower) ||
          service.description.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Фильтрация по диапазону цен
    filteredServices = filteredServices.filter(
      (service) =>
        service.price >= filters.priceRange.min &&
        service.price <= filters.priceRange.max
    );
    
    return filteredServices;
  },
  
  getCategories: async (): Promise<ServiceCategory[]> => {
    // Имитация задержки сервера
    await new Promise((resolve) => setTimeout(resolve, DELAY));
    
    return mockCategories;
  },
  
  getServiceById: async (id: string): Promise<Service> => {
    // Имитация задержки сервера
    await new Promise((resolve) => setTimeout(resolve, DELAY));
    
    const service = mockServices.find((service) => service.id === id);
    
    if (!service) {
      throw new Error('Услуга не найдена');
    }
    
    return service;
  },
};