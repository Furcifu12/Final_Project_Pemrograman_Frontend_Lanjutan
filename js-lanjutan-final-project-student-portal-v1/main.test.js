const { expect, describe, it } = require("@jest/globals");
const {
    studentActivitiesRegistration,
    getStudentActivities,
    addStudent,
    deleteStudent,
} = require("./main");

describe("studentActivitiesRegistration", () => {
    describe("When method is 'CREATE'", () => {
        it("register the student and add data and then return the new student data", async () => {
            global.fetch = jest.fn((url) => {
                switch (url) {
                    case "http://localhost:3001/activities":
                        return Promise.resolve({
                            json: () =>
                                Promise.resolve(mockedStudentActivities),
                        });
                    case "http://localhost:3001/students":
                        return Promise.resolve({
                            json: () => Promise.resolve(mockedAddStudent1),
                        });
                }
            });

            const ukmRegist = await studentActivitiesRegistration([
                "CREATE",
                "Rakanda Pangeran Nasution",
                "Monday",
            ]);

            const { calls } = fetch.mock;
            const body = JSON.parse(calls[1][1].body);

            expect(calls[1][0]).toBe("http://localhost:3001/students");
            expect(calls[1][1].method).toBe("POST");
            expect(calls[1][1].headers["Content-Type"]).toBe(
                "application/json"
            );
            expect(body.name).toBe("Rakanda Pangeran Nasution");
            expect(body.activities).toEqual(
                expect.arrayContaining([
                    {
                        name: "Satre",
                        desc: "Seni Teater",
                    },
                    {
                        name: "PEDS",
                        desc: "English Debate Society",
                    },
                ])
            );
            expect(ukmRegist).toEqual(mockedAddStudent1);
        });
    });

    describe("When method is 'DELETE'", () => {
        it("delete student data according to id then return a success message according to the template provided", async () => {
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () =>
                        Promise.resolve({
                            message: `Successfully deleted student data with id 1`,
                        }),
                })
            );

            const ukmRegist = await studentActivitiesRegistration([
                "DELETE",
                "1",
            ]);

            const { calls } = fetch.mock;

            expect(calls[0][0]).toBe("http://localhost:3001/students/1");
            expect(calls[0][1].method).toBe("DELETE");
            expect(calls[0][1].headers["Content-Type"]).toBe(
                "application/json"
            );
            expect(ukmRegist).toEqual({
                message: `Successfully deleted student data with id 1`,
            });
        });
    });
});

describe("getStudentActivities", () => {
    it("return student activities data", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve(mockedStudentActivities),
            })
        );

        const studentActivities = await getStudentActivities();
        const { calls } = fetch.mock;

        expect(calls[0][0]).toBe("http://localhost:3001/activities");
        expect(studentActivities).toEqual(mockedStudentActivities);
    });
});

describe("addStudent", () => {
    it("register the student and add data and then return the new student data", async () => {
        global.fetch = jest.fn((url) => {
            switch (url) {
                case "http://localhost:3001/activities":
                    return Promise.resolve({
                        json: () => Promise.resolve(mockedStudentActivities),
                    });
                case "http://localhost:3001/students":
                    return Promise.resolve({
                        json: () => Promise.resolve(mockedAddStudent2),
                    });
            }
        });

        const add = await addStudent("Naufal Yusnanda", "Tuesday");

        const { calls } = fetch.mock;
        const body = JSON.parse(calls[1][1].body);

        expect(calls[1][0]).toBe("http://localhost:3001/students");
        expect(calls[1][1].method).toBe("POST");
        expect(calls[1][1].headers["Content-Type"]).toBe("application/json");
        expect(body.name).toBe("Naufal Yusnanda");
        expect(body.activities).toEqual(
            expect.arrayContaining([
                {
                    name: "Softball",
                    desc: "Softball",
                },
                {
                    name: "Capoeira",
                    desc: "Capoeira",
                },
                {
                    name: "Air Soft Gun",
                    desc: "Air Soft Gun",
                },
            ])
        );
        expect(add).toEqual(mockedAddStudent2);
    });
});

describe("deleteStudent", () => {
    it("delete student data according to id then return a success message according to the template provided", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () =>
                    Promise.resolve({
                        message: `Successfully deleted student data with id 100`,
                    }),
            })
        );

        const del = await deleteStudent("100");

        const { calls } = fetch.mock;

        expect(calls[0][0]).toBe("http://localhost:3001/students/100");
        expect(calls[0][1].method).toBe("DELETE");
        expect(calls[0][1].headers["Content-Type"]).toBe("application/json");
        expect(del).toEqual({
            message: `Successfully deleted student data with id 100`,
        });
    });
});

const mockedAddStudent1 = {
    name: "Rakanda Pangeran Nasution",
    activities: [
        {
            name: "Satre",
            desc: "Seni Teater",
        },
        {
            name: "PEDS",
            desc: "English Debate Society",
        },
    ],
    id: 1,
};

const mockedAddStudent2 = {
    name: "Naufal Yusnanda",
    activities: [
        {
            name: "Softball",
            desc: "Softball",
        },
        {
            name: "Capoeira",
            desc: "Capoeira",
        },
        {
            name: "Air Soft Gun",
            desc: "Air Soft Gun",
        },
    ],
    id: 1,
};

const mockedStudentActivities = [
    {
        id: 1,
        name: "Mahitala",
        desc: "Mahasiswa Pecinta Alam",
        days: ["Sunday"],
    },
    {
        id: 2,
        name: "Listra",
        desc: "Seni Tari Tradisional",
        days: ["Wednesday", "Friday"],
    },
    {
        id: 3,
        name: "Satre",
        desc: "Seni Teater",
        days: ["Monday", "Thursday"],
    },
    {
        id: 4,
        name: "PEDS",
        desc: "English Debate Society",
        days: ["Monday"],
    },
    {
        id: 5,
        name: "Korgala",
        desc: "Korps Tenaga Sukarela",
        days: ["Saturday", "Sunday"],
    },
    {
        id: 6,
        name: "PSM",
        desc: "Paduan Suara Mahasiswa",
        days: ["Wednesday", "Friday"],
    },
    {
        id: 7,
        name: "Softball",
        desc: "Softball",
        days: ["Tuesday"],
    },
    {
        id: 8,
        name: "Futsal",
        desc: "Futsal",
        days: ["Saturday"],
    },
    {
        id: 9,
        name: "Basket",
        desc: "Basket",
        days: ["Thursday"],
    },
    {
        id: 10,
        name: "Tenis",
        desc: "Tenis",
        days: ["Saturday"],
    },
    {
        id: 11,
        name: "Capoeira",
        desc: "Capoeira",
        days: ["Tuesday", "Thursday"],
    },
    {
        id: 12,
        name: "Air Soft Gun",
        desc: "Air Soft Gun",
        days: ["Tuesday"],
    },
];
