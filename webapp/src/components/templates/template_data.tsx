// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {ReactNode} from 'react';

import {mtrim} from 'js-trim-multiline-string';

import {DraftPlaybookWithChecklist, emptyPlaybook, newChecklistItem} from 'src/types/playbook';

import MattermostLogo from 'src/components/assets/mattermost_logo_svg';
import ClipboardChecklist from 'src/components/assets/illustrations/clipboard_checklist_svg';
import DumpsterFire from 'src/components/assets/illustrations/dumpster_fire_svg';
import Gears from 'src/components/assets/illustrations/gears_svg';

//import Handshake from 'src/components/assets/illustrations/handshake_svg';
import Rocket from 'src/components/assets/illustrations/rocket_svg';

//import SmileySunglasses from 'src/components/assets/illustrations/smiley_sunglasses_svg';
//import BugSearch from 'src/components/assets/illustrations/bug_search_svg';
import LightBulb from 'src/components/assets/illustrations/light_bulb_svg';

export interface PresetTemplate {
    label?: string;
    labelColor?: string;
    title: string;
    description?: string;

    author?: ReactNode;
    icon: ReactNode;
    color?: string;
    template: DraftPlaybookWithChecklist;
}

const preprocessTemplates = (presetTemplates: PresetTemplate[]): PresetTemplate[] => (
    presetTemplates.map((pt) => ({
        ...pt,
        template: {
            ...pt.template,
            num_stages: pt.template?.checklists.length,
            num_actions:
                1 + // Channel creation is hard-coded
                (pt.template.message_on_join_enabled ? 1 : 0) +
                (pt.template.signal_any_keywords_enabled ? 1 : 0) +
                (pt.template.run_summary_template_enabled ? 1 : 0),
            checklists: pt.template?.checklists.map((checklist) => ({
                ...checklist,
                items: checklist.items?.map((item) => ({
                    ...newChecklistItem(),
                    ...item,
                })) || [],
            })),
        },
    }))
);

export const PresetTemplates: PresetTemplate[] = preprocessTemplates([
    {
        title: 'Пустой',
        icon: <ClipboardChecklist/>,
        color: '#FFBC1F14',
        description: 'Начните с пустого состояния и создайте свой собственный шедевр.',
        template: {
            ...emptyPlaybook(),
            title: 'Пустой',
            description: 'Настройте описание этого сценария, чтобы дать обзор того, когда и как этот сценарий запускается.',
        },
    },
    {
        title: 'Выпуск продукта',
        description: 'Совершенствуйте процесс выпуска от идеи до производства.',
        icon: <Rocket/>,
        color: '#C4313314',
        author: <MattermostLogo/>,
        template: {
            ...emptyPlaybook(),
            title: 'Выпуск продукта',
            description: 'Настройте этот сценарий так, чтобы он отражал ваш собственный процесс выпуска продукта.',
            checklists: [
                {
                    title: 'Подготовка',
                    items: [
                        newChecklistItem('Проверка заявок и данных от отдела продаж для объединения'),
                        newChecklistItem('Начать составлять список изменений, документацию и маркетинговые материалы.'),
                        newChecklistItem('Просмотр и обновление списка необходимых ресурсов'),
                        newChecklistItem('Подготовка задания к дегустации продукта'),
                    ],
                },
                {
                    title: 'Тестирование',
                    items: [
                        newChecklistItem('Получить релиз-кандидат (RC-1)'),
                        newChecklistItem('Проведение теста/дегустации на предварительной версии продукта'),
                        newChecklistItem('Исправление ошибок, учёт пожеланий и замечаний.'),
                    ],
                },
                {
                    title: 'Подготовить продукт к производству',
                    items: [
                        newChecklistItem('Утверждение финальной версии продукта'),
                        newChecklistItem('Производство финальной версии продукта'),
                        newChecklistItem('Фиксирование журнала изменений, заметок об обновлении и документации по продукту'),
                        newChecklistItem('Публикация объявлений и маркетинг'),
                    ],
                },
                {
                    title: 'Пост-релиз',
                    items: [
                        newChecklistItem('Запланировать выпуск ретроспективы'),
                        newChecklistItem('Добавьте даты следующего релиза в календарь релизов и сообщите заинтересованным сторонам'),
                        newChecklistItem('Составьте метрики выпуска'),
                        newChecklistItem('Архивация канала инцидента'),
                    ],
                },
            ],
            create_public_playbook_run: false,
            channel_name_template: 'Продукт "рабочее название"',
            message_on_join_enabled: true,
            message_on_join:
                mtrim`Привет и добро пожаловать!

                Этот канал был создан как часть сценария **Выпуск продукта**, и на нем ведутся обсуждения, связанные с этим выпуском. Вы можете настроить это сообщение, используя markdown (язык разметки), чтобы каждый новый участник канала мог приветствоваться полезным контекстом и ресурсами.`,
            run_summary_template_enabled: true,
            run_summary_template:
                mtrim`**О продукте**
                - Название: TBD
                - Срок: TBD

                **Ресурсы**
                - `,
            reminder_message_template:
                mtrim`### Изменения с момента последнего обновления
                -

                ### Отставание в процессах
                - `,
            reminder_timer_default_seconds: 24 * 60 * 60, // 24 hours
            retrospective_template:
                mtrim`### Начато
                -

                ### Закончено
                -

                ### Всё ещё в процессе
                - `,
            retrospective_reminder_interval_seconds: 0, // Once
        },
    },
    {
        title: 'Разрешение инцидента',
        description: 'Разрешение инцидентов требует скорости и точности. Оптимизируйте свои процессы для быстрого реагирования и разрешения проблем.',
        icon: <DumpsterFire/>,
        author: <MattermostLogo/>,
        color: '#33997014',
        template: {
            ...emptyPlaybook(),
            title: 'Разрешение инцидента',
            description: 'Настройте этот сценарий так, чтобы он отражал ваш собственный процесс разрешения инцидентов.',
            checklists: [
                {
                    title: 'Настройка для сортировки',
                    items: [
                        newChecklistItem('Добавить дежурного инженера на канал'),
                        newChecklistItem('Созвон', '', '/zoom start'),
                        newChecklistItem('Обновление описания с учетом текущей ситуации'),
                        newChecklistItem('Создать заявку на инцидент', '', '/jira create'),
                        newChecklistItem('Назначьте серьезность в описании (например, #sev-2)'),
                        newChecklistItem('(Если #sev-1) Сообщить @vip'),
                    ],
                },
                {
                    title: 'Расследовать причину',
                    items: [
                        newChecklistItem('Добавьте сюда предполагаемые причины и отметьте, если они устранены'),
                    ],
                },
                {
                    title: 'Разрешение',
                    items: [
                        newChecklistItem('Подтверждение, что проблема решена'),
                        newChecklistItem('Сообщение менеджерам и всем ответственным за этот участок'),
                        newChecklistItem('(Если sev-1) Сообщить руководителю подразделения'),
                    ],
                },
                {
                    title: 'Ретроспектива',
                    items: [
                        newChecklistItem('Рассылка опроса участникам'),
                        newChecklistItem('Назначить последнюю встречу этого инцидента'),
                        newChecklistItem('Сохранить ключевые сообщения как записи временной шкалы'),
                        newChecklistItem('Опубликовать ретроспективный отчет'),
                    ],
                },
            ],
            create_public_playbook_run: false,
            channel_name_template: 'Инцидент: <name>',
            message_on_join_enabled: true,
            message_on_join:
                mtrim`Привет и добро пожаловать!

                Этот канал был создан как часть сценария **Разрешение инцидентов**, и на нем ведутся обсуждения, связанные с этим выпуском. Вы можете настроить это сообщение, используя markdown (язык разметки), чтобы каждый новый участник канала мог приветствоваться полезным контекстом и ресурсами.`,
            run_summary_template_enabled: true,
            run_summary_template:
                mtrim`**Сводка**

                **Воздействие на клиентов**

                **О...**
                - Серъёзность инцидента: #sev-1/2/3
                - Ответственные:
                - Расчетное время разрешения:`,
            reminder_message_template: '',
            reminder_timer_default_seconds: 60 * 60, // 1 hour
            retrospective_template:
                mtrim`### Сводка
                Он должен содержать 2-3 предложения, которые дают читателю общее представление о том, что произошло, какова была причина и что было сделано. Чем короче, тем лучше, так как это то, на что будущие команды будут смотреть в первую очередь для справки.

                ### Каково было влияние?
                В этом разделе описывается влияние этого сценария на опыт внутренних и внешних клиентов, а также заинтересованных сторон.

                ### Каковы были способствующие факторы?
                Этот сценарий может быть реактивным протоколом к ситуации, которая в противном случае нежелательна. Если это так, в этом разделе объясняются причины, вызвавшие ситуацию в первую очередь. Может быть несколько основных причин — это помогает заинтересованным сторонам понять, почему так всё произошло.

                ### Что было сделано?
                В этом разделе рассказывается о том, как команда сотрудничала на протяжении всего мероприятия для достижения результата. Это поможет будущим командам узнать из этого опыта о том, что они могут попробовать.

                ### Что мы узнали?
                Этот раздел должен включать точки зрения всех, кто участвовал в праздновании побед и определении областей, требующих улучшения. Например: Что прошло хорошо? Что не получилось? Что нужно сделать по-другому в следующий раз?

                ### Последующие задачи
                В этом разделе перечислены действия, которые помогут преобразовать полученные знания в изменения, которые помогут команде стать более опытной в итерациях. Это может включать настройку сценария, публикацию ретроспективы или другие улучшения. У лучших последующих действий будет назначен четкий владелец, а также срок выполнения.

                ### Основные моменты хронологии
                Этот раздел представляет собой тщательно подобранный журнал, в котором подробно описаны наиболее важные моменты. Он может содержать ключевые сообщения, снимки экрана или другие артефакты. Используйте встроенную функцию временной шкалы, чтобы проследить и воспроизвести последовательность событий.`,
            retrospective_reminder_interval_seconds: 24 * 60 * 60, // 24 hours
            signal_any_keywords_enabled: true,
            signal_any_keywords: ['sev-1', 'sev-2', '#инцидент', 'это серьезно'],
        },
    },
    {
        title: 'Внедрение новой функциональности в программу',
        description: 'Создавайте прозрачные рабочие процессы между командами разработчиков, чтобы обеспечить беспрепятственный процесс разработки функций.',
        icon: <Gears/>,
        color: '#62697E14',
        author: <MattermostLogo/>,
        template: {
            ...emptyPlaybook(),
            title: 'Внедрение новой функциональности в программу',
            description: 'Настройте этот сценарий так, чтобы он отражал ваш собственный процесс жизненного цикла новой функциональности.',
            checklists: [
                {
                    title: 'План',
                    items: [
                        newChecklistItem('Объяснение, в чем проблема и почему это важно'),
                        newChecklistItem('Предложение возможных решений'),
                        newChecklistItem('Перечислить открытые вопросы и предположения'),
                        newChecklistItem('Установить срок'),
                    ],
                },
                {
                    title: 'Старт',
                    items: [
                        newChecklistItem(
                            'Выберите инженерного владельца для новой функции',
                            mtrim`Ожидания от владельца:
                            - Отвечает за установление и соблюдение ожидаемых сроков' +
                            - Публиковать еженедельное обновление статуса' +
                            - Демонстрационная функция на совещании по исследованиям и разработкам' +
                            - Обеспечение технического качества после выпуска`,
                        ),
                        newChecklistItem('Определите и пригласите участников на функциональный канал'),
                        newChecklistItem(
                            'Запланируйте стартовые и повторяющиеся контрольные встречи',
                            mtrim`Ожидания после стартовой встречи:
                            - Согласование с конкретной проблемой в дополнение к приблизительному объему и цели
                            - Четкие следующие шаги и результаты для каждого человека`,
                        ),
                    ],
                },
                {
                    title: 'Создание',
                    items: [
                        newChecklistItem(
                            'Согласуйте объем, качество и время.',
                            'Здесь, вероятно, предпринимается много разных усилий для достижения согласованности, этот флажок просто символизирует одобрение со стороны участников.',
                        ),
                        newChecklistItem('Разбейте вехи функции разбивки и добавьте их в этот контрольный список'),
                    ],
                },
                {
                    title: 'Отгрузка',
                    items: [
                        newChecklistItem('Обновление документации и руководств пользователя'),
                        newChecklistItem('Объедините все функции и сообщения об ошибках, чтобы освоить их'),
                        newChecklistItem(
                            'Демонстрация для сообщества',
                            mtrim`Например:
                            - Совещание по исследованиям и разработкам
                            - Встреча разработчиков
                            - Общее собрание компании`
                        ),
                        newChecklistItem('Создайте информационную панель телеметрии для измерения внедрения'),
                    ],
                },
                {
                    title: 'Развитие',
                    items: [
                        newChecklistItem('Запланируйте встречу для рассмотрения показателей внедрения и отзывов пользователей'),
                        newChecklistItem('Планируйте улучшения и следующую итерацию'),
                    ],
                },
            ],
            create_public_playbook_run: true,
            channel_name_template: 'Функциональность: <name>',
            message_on_join_enabled: true,
            message_on_join:
                mtrim`Привет и добро пожаловать!

                Этот канал был создан как часть сценария **Внедрение новой функциональности в программу**, и на нем ведутся обсуждения, связанные с разработкой этой функции. Вы можете настроить это сообщение с помощью Markdown, чтобы каждый новый участник канала мог приветствоваться полезным контекстом и ресурсами.`,
            run_summary_template_enabled: true,
            run_summary_template:
                mtrim`**Одной строкой**
                <т.е. Разрешить пользователям прописывать шаблон описания, чтобы он был согласованным для каждого запуска и, следовательно, его было легче читать.>

                **Релиз целей**
                - Завершения кода: date
                - Версия для клиентов: month

                **Ресурсы**
                - Jira Epic: <link>
                - UX prototype: <link>
                - Technical design: <link>
                - User docs: <link>`,
            reminder_message_template:
                mtrim`### Demo
                <Insert_GIF_here>

                ### Изменения с прошлой недели
                -

                ### Риски
                - `,
            reminder_timer_default_seconds: 24 * 60 * 60, // 1 day
            retrospective_template:
                mtrim`### Начато
                -

                ### Завершено
                -

                ### В процессе
                - `,
            retrospective_reminder_interval_seconds: 0, // Once
        },
    },
    {
        title: 'Узнайте, как использовать сценарии',
        label: 'Рекомендуется для начинающих',
        labelColor: '#E5AA1F29-#A37200',
        icon: <LightBulb/>,
        color: '#FFBC1F14',
        author: <MattermostLogo/>,
        description: 'Новичок в сценариях? Этот сценарий поможет вам ознакомиться с сценариями, конфигурациями и запусками.',
        template: {
            ...emptyPlaybook(),
            title: 'Узнайте, как использовать сценарии',
            description: mtrim`Используйте этот учебник, чтобы узнать больше о сборниках сценариев. Перейдите на эту страницу, чтобы проверить содержимое, или просто выберите «Начать тестовый запуск» в правом верхнем углу.`,
            create_public_playbook_run: true,
            channel_name_template: 'Вводный курс',
            checklists: [
                {
                    title: 'Знакомство',
                    items: [
                        newChecklistItem(
                            'Попробуйте изменить название или описание цикла в верхней части этой страницы.',
                        ),
                        newChecklistItem(
                            'Попробуйте отметить первые две задачи!',
                        ),
                        newChecklistItem(
                            'Назначьте задачу себе или другому участнику.',
                        ),
                        newChecklistItem(
                            'Разместите свое первое обновление статуса.',
                        ),
                        newChecklistItem(
                            'Заполните свой первый чек-лист!',
                        ),
                    ],
                },
                {
                    title: 'Сотрудничество',
                    items: [
                        newChecklistItem(
                            'Пригласите других членов команды, с которыми вы хотели бы сотрудничать.',
                        ),
                        newChecklistItem(
                            'Пропустить задание.',
                        ),
                        newChecklistItem(
                            'Закончить запуск.',
                        ),
                    ],
                },
            ],
            status_update_enabled: true,
            reminder_timer_default_seconds: 50 * 60, // 50 minutes
            message_on_join: '',
            message_on_join_enabled: false,
            retrospective_enabled: false,
            run_summary_template_enabled: true,
            run_summary_template: mtrim`Эта сводная область помогает всем участникам быстро собрать контекст. Он поддерживает синтаксис Markdown (язык разметки) так же, как в сообщениях канала. Просто нажмите, чтобы отредактировать и попробовать!

            - Дата начала: 17 Июл, 2023
            - Целевая дата: Будет определена
            - Руководство пользователя: документы сценариев`,
        },
    },
]);

export default PresetTemplates;
