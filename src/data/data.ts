export const categories = ['Work', 'Sport', 'Education', 'Health&Beauty', 'Hobby', 'Leisure', 'Family&Friends', 'Home', 'Other']

export const roles = ['admin', 'client']

export const links = [
    {
        route: "/",
        name: "Feed"
    },
    {
        route: "/users",
        name: "Users"
    },
    {
        route: "/tasks",
        name: "Community tasks"
    },
    {
        route: "/events",
        name: "Events"
    },
    {
        route: "/messages",
        name: "Messages"
    },
]


export const events = [
    {
        _id: "63f7c126cb58bf7b9811f0432",
        userId: "63f7c126cb58bf7b9811f043", // Пример ObjectId для userId
        task: "63f7cfb26ebe353cfbb2332a", // Пример ObjectId для taskId
        priority: 'high',
        status: 'todo',
        start: new Date('2024-02-25T08:00:00Z'),
        end: new Date('2024-02-25T10:00:00Z'),
        recurring: false,
        reminders: [new Date('2024-02-25T07:00:00Z')],
    },
    {
        _id: "63f7c126cb58bf7b9811f0432",
        userId: "63f7c126cb58bf7b9811f043", // Пример ObjectId для userId
        task: "63f7cfb26ebe353cfbb2332a", // Пример ObjectId для taskId
        priority: 'medium',
        status: 'in_progress',
        start: new Date('2024-02-26T09:00:00Z'),
        end: new Date('2024-02-26T11:00:00Z'),
        recurring: false,
        reminders: [new Date('2024-02-26T08:00:00Z')],
    },
    {
        _id: "63f7c126cb58bf7b9811f0432",
        userId: "63f7c126cb58bf7b9811f043", // Пример ObjectId для userId
        task: "63f7cfb26ebe353cfbb2332a", // Пример ObjectId для taskId
        priority: 'low',
        status: 'done',
        start: new Date('2024-02-27T10:00:00Z'),
        end: new Date('2024-02-27T12:00:00Z'),
        recurring: true,
        reminders: [new Date('2024-02-27T09:00:00Z')],
    },
];
