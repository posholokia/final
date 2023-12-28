## Дипломная работа

### Запуск
```
cd final
docker-compose build
docker-compose up
```
### API doc
`http://localhost:8000/api/schema/swagger-ui`

### Использование
Клиентское приложение по ссылке: `http://localhost:8080/`

### Данные для входа.
**Логины**

*Менеджер*: manager

*Сервисная компания*: prom_tech, silant, fns

*Клиенты*: trudnikov, fpk21, msn77, ranskii_lph, и др.

**Пароль**

У всех один: `Pass!234`

*Администратор*: Логин: admin Пароль: admin

Для Роли *Менеджер* доступно внесение изменения в справочники и машины через админ панель:
`http://localhost:8000/admin/`

Весь остальной функционал, в том числе и для остальных ролей через react приложение.