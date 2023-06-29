# Student Portal - Student Activities Registration

## Final Project

### Notes

Sebelum mengerjakan kalian **WAJIB** menjalankan _command_ `pnpm install` atau `npm install` untuk menginstal _depedency_ yang diperlukan.

### Description

_**Student Activities Registration**_ merupakan sebuah aplikasi untuk _student_ dapat melakukan pendaftaran UKM (Unit Kegiatan Mahasiswa) sesuai dengan hari yang diajukan _student_ serta menghapus data _student_ yang sudah di daftarkan.

Pada _final project_ ini, kalian di berikan beberapa _async function_ dengan penamaan sesuai dengan kegunaannya, antara lain:

-   `studentActivitiesRegistration` : Merupakan sebuah **_function_ utama** yang akan **memanggil _function_ lainnya** untuk mendaftarkan atau menghapus data student.
-   `getStudentActivities` : Merupakan sebuah _function_ untuk **mendapatkan data UKM** apa saja yang tersedia.
-   `addStudent` : Merupakan sebuah _function_ untuk **mendaftarkan data student**.
-   `deleteStudent` : Merupakan sebuah _function_ untuk **menghapus data student**.

Selain itu kalian diberikan juga sebuah file `json-server` dengan nama `student-activities-db.json` dalam folder `/server` sebagai _server_ kalian yang memiliki beberapa _end-points_, antara lain:

-   GET `/students` : Untuk mendapatkan data _student_.
-   POST `/students` : Untuk mendaftarkan data _student_.
-   DELETE `/students/id` : Untuk menghapus data _student_ berdasarkan `id` _student_.
-   GET `/activities` : Untuk mendapatkan data UKM.

> Server dapat di jalankan menggunakan command `npm run start:server` dan akan berjalan pada `http://localhost:3001`.

Terdapat beberapa format input terminal yang **WAJIB** kalian ikuti, antara lain:

-   **Add Student**

    ```txt
    node main.js METHOD "Name" "Day"
    ```

    contoh

    ```bash
    node main.js "CREATE" "John Doe" "Sunday"
    ```

-   **Delete Student**

    ```txt
    node main.js METHOD "id"
    ```

    contoh

    ```bash
    node main.js "DELETE" "2"
    ```

Terdapat juga _function_ `process_argv` yang akan menerima _input_ yang kalian masukan pada terminal. _Function_ ini sendiri akan memanggil _function_ `studentActivitiesRegistration` yang kalian gunakan.

> Kalian tidak perlu mengubah atau mengerjakan apa pun pada _function_ `process_argv`

### `getStudentActivities`

_Function_ `getStudentActivities` merupakan _function_ yang digunakan untuk mendapatkan data dari UKM apa saja yang tersedia untuk _student_. Untuk mendapatkan data UKM kalian dapat melakukan _hit_ ke _end-point_ `/activities` pada `json-server`. Terdapat data yang di sediakan pada `json-server` berupa data seluruh UKM yang terdaftar.

```json
"activities": [
    {
      "id": 1,
      "name": "Mahitala",
      "desc": "Mahasiswa Pecinta Alam",
      "days": [
        "Sunday"
      ]
    },
    {
      "id": 2,
      "name": "Listra",
      "desc": "Seni Tari Tradisional",
      "days": [
        "Wednesday",
        "Friday"
      ]
    },
    {
      "id": 3,
      "name": "Satre",
      "desc": "Seni Teater",
      "days": [
        "Monday",
        "Thursday"
      ]
    },
    ...
  ]
```

> notes: _Function_ ini tidak menerima parameter apapun.

_Output_ pada _function_ ini berupa `array of objects` yang mana setiap elemen dari `array` merupakan data berupa `object` dari UKM yang terdaftar dengan _key_ sebagai berikut:

| Key    | Value Type      |
| ------ | --------------- |
| _id_   | integer         |
| _name_ | string          |
| _desc_ | string          |
| _days_ | array of string |

Input:

```js
getStudentActivities();
```

Expected Output / Behavior:

```js
[
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
    ...
];
```

### `studentActivitiesRegistration`

_Function_ `studentActivitiesRegistration` merupakan sebuah _function_ utama yang menerima sebuah parameter `data` dan akan memanggil 2 _function_ lainnya yaitu _function_ untuk mendaftarkan _student_ berupa `addStudent` dan _function_ untuk menghapus _student_ berupa `deleteStudent` berdasarkan `METHOD` yang diterimanya.

_Value_ parameter `data` pada _function_ ini berupa `array` yang memiliki _element_ berupa _method_, _name_ dan _day_ (add) atau _method_ dan _id_ (delete) yang kalian butuhkan berdasarkan _input_ yang dimasukan melalui terminal. Sedangkan _output_ dari _function_ ini berupa `object` tergantung dari _method_ yang diterimanya.

Dibawah ini ketentuan dalam pengerjaan pada function `studentActivitiesRegistration`:

-   Diasumsikan `METHOD` yang diterima **hanya** berupa `CREATE` atau `DELETE` (**dalam huruf besar/kapital**)
-   Jika `METHOD` yang diterima bernilai `CREATE`, sistem akan **memproses pendaftaran data student**.
-   Jika `METHOD` yang diterima bernilai `DELETE`, sistem akan **memproses penghapusan data student**.

#### Test Case

-   **ADD**:

    Input:

    ```js
    // studentActivitiesRegistration(data);
    studentActivitiesRegistration(["CREATE", "Anshori Atmodiredjo", "Sunday"]);
    ```

    Expected Output / Behavior:

    ```js
    {
        id: 2,
        name: 'Anshori Atmodiredjo',
        activities: [
            { name: 'Mahitala', desc: 'Mahasiswa Pecinta Alam' },
            { name: 'Korgala', desc: 'Korps Tenaga Sukarela' }
        ]
    }
    ```

    Explanation:

    ```txt
    `METHOD` yang diterima bernilai `CREATE`, sistem akan memproses pendaftaran data student.
    `name` yang diterima berupa 'Anshori Atmodiredjo'.
    `day` yang diterima berupa 'Sunday', sehingga akan mencari UKM apa saja yang tersedia di hari tersebut.
    Berdasarkan data yang diterima, UKM yang tersedia di hari tersebut adalah 'Mahitala' dan 'Korgala'
    ```

-   **DELETE**:

    Input:

    ```js
    // studentActivitiesRegistration(data);
    studentActivitiesRegistration(["DELETE", "2"]);
    ```

    Expected Output / Behavior:

    ```js
    {
        message: "Successfully deleted student data with id 2";
    }
    ```

    Explanation:

    ```txt
    `METHOD` yang diterima bernilai `DELETE`, sistem akan memproses penghapusan data student.
    `id` yang diterima bernilai '2'.
    Sehingga akan menghapus data student pada database dengan `id` yang diterima dan menampilkan pesan sesuai template.
    ```

### `addStudent`

_Function_ `addStudent` akan menerima sebuah parameter berupa `name` dan `day` dalam bentuk `string`. Pada _function_ ini kalian di minta untuk **mendaftarkan** _data_ student yang diterima dalam parameter ke dalam _database_ dengan format berikut:

| Name         | Data Type        |
| ------------ | ---------------- |
| _name_       | string           |
| _activities_ | array of objects |

-   `name`: merupakan sama _student_ yang diterima pada parameter.
-   `activities`: merupakan data UKM apa saja yang dapat diikuti oleh _student_ berdasarkan `day` yang diterima dari paramter.

Kalian dapat menggunakan function `getStudentActivities` untuk mendapatkan data UKM yang terdaftar, lalu membandingkan hari yang diajukan student dengan hari yang tersedia dari masing-masing UKM. Yang perlu di perhatikan adalah setiap data dari UKM yang dapat diikuti oleh student dalam `object` yang memiliki _key_ berupa `name` dan `desc` (**`id` dan `days` tidak disertakan**).

```js
// Contoh:

{
    name: "Mahitala",
    desc: "Mahasiswa Pecinta Alam"
}
```

Untuk melakukan _create_ _data_ kalian dapat menggunakan _end-point_ `/students`.

Input:

```js
// addStudent(name, day)
addStudent("Anshori Atmodiredjo", "Sunday");
```

Expected Output / Behavior:

```js
{
    id: 2,
    name: 'Anshori Atmodiredjo',
    activities: [
        { name: 'Mahitala', desc: 'Mahasiswa Pecinta Alam' },
        { name: 'Korgala', desc: 'Korps Tenaga Sukarela' }
    ]
}
```

Explanation:

```txt
`name` yang diterima berupa 'Anshori Atmodiredjo'.
`day` yang diterima berupa 'Sunday', sehingga akan mencari UKM apa saja yang tersedia di hari tersebut.
Berdasarkan data yang diterima, UKM yang tersedia di hari tersebut adalah 'Mahitala' dan 'Korgala'
```

### `deleteStudent`

_Function_ `deleteStudent` akan menerima sebuah parameter berupa `id` _student_ dalam bentuk `string`. Pada _function_ ini kalian di minta untuk menghapus _data_ _student_ yang sudah ada pada _database_ sesuai dengan `id` yang diterima dalam parameter. Jika data berhasil di hapus maka akan mengembalikan message dalam bentuk `object` sebagai berikut:

```txt
"Successfully deleted student data with id <studentId>"
```

Untuk melakukan _delete_ _data_ kalian dapat menggunakan _endpoint_ `/students`

Input:

```js
// deleteStudent(id)
deleteStudent("2");
```

Expected Output / Behavior:

```js
{
    message: "Successfully deleted student data with id 2";
}
```
Explanation:

```txt
`id` yang diterima bernilai '2'.
Sehingga akan menghapus data student pada database dengan `id` yang diterima dan menampilkan pesan sesuai template.
```