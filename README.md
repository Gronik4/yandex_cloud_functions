# Курс Node.js  
## Блок: Yandex Cloud  
### Тема: Yandex Cloud Functions
Домашнее задание №2  
Задачи №1 и №2  
Автор: Гречишников О.Н. группа: NDJS-ASINHR  

### Порядок работы  
1. Создать сервер.
  При создании сервера:  
  а). Использовать только require('')!!!  
  b). Использовать только `module.exports.handler = serverless(app);`  
  
2. В проекте в zip-архив (только zip!!!! Ни каких 7zip!!) загрузить следующие файлы:  
 а). Сам сервер(Обычно index.js и все файлы на которые он ссылается в нашем случае character.js)  
 в). package.json  
 c). Архив рекомендуется назвать тоже index-js   
  
3. В Yandex Cloud создать каталог и в нем создать функцию:  
   а). Точка входа: `<Имя сервера>.handler` в нашем случае: `index.handler` - см пункт 1.в  
   в). Загрузить zip-архив и проверить работу перейдя по ссылке. Ответ: `/? не найдено на этом сервере`.  
4. Создать API-шлюз: Бессерверные вычисления->API Geteway.  
  a). Документация->Начало работы с Yandex API Gateway -> Концепции->Расширенные спецификации->Интеграции->Cloud Function. Здесь пример спецификации.  
  b). Из примера копируем от `x-yc-apigateway-integration:` включительно и до конца.  
  с). Заменяем соответствующий раздел в нашем шлюзе.  
  d). Заменяем `function_id` - id нашей функции.  
  e). `tag` и `service_accaunt_id` можно удалить, т.к. функция у нас публичная  
  f). Добавляем все роуты  
  g). Проверяем: `https://d5dtshnfpb2ftqv8gtp5.emzafcgx.apigw.yandexcloud.net/api/characters` - показывает всех персонажей `https://d5dtshnfpb2ftqv8gtp5.emzafcgx.apigw.yandexcloud.net/api/characters/1` - должен показать персонажа с id=1.  
    
Проблемы: по адресу:`https://d5dtshnfpb2ftqv8gtp5.emzafcgx.apigw.yandexcloud.net/api/characters/1` - ответ: `/api/characters/1? не найдено на этом сервере`.  
Решение: В спецификацию, в нужный метод(в нашем случае: `/api/character/:id`), после `get` и до `x-yc-apigateway-integration:`- добавить следующее:  
```JS
summary: Get id
      operationId: getid
      tags:
        - example
      parameters:
        - name: id
          in: path
          description: Return id
          required: true
          schema:
            type: string  
```    
В раздел `x-yc-apigateway-integration:` - добавить строку: `payload_format_version: '1.0'`.  
Проследить, чтобы было именно `1.0`!!!   
Пример извлечения path параметров в Expressjs приложении, из официальной документации [здесь](https://nikolaymatrosov.ru/2020-12-13-Run-Express-js-app-in-Yandex-Cloud-Functions/#path-parameters)