# 💍 Marriage Journey

**Marriage Journey** is a lightweight, static website designed to help users organize and track different stages of the marriage process. With three dedicated sections — Engagement, Home Expenses, and Wedding — the site offers an intuitive interface for managing and storing data locally in the browser.

---

## 🌐 Overview

This project aims to assist individuals or couples in keeping track of important items and costs during the marriage journey. Each section redirects to its own page, where users can add, edit, lock, or delete rows in a table, and save the data using browser local storage.

---

## 📋 Features

- ✅ Three sections: **Engagement**, **Home Expenses**, and **Wedding**
- 🧾 Dynamic tables with editable rows
- 💾 Data persistence using **localStorage**
- 🔒 Ability to lock/unlock rows
- 🗑️ Delete individual entries or clear all saved data
- 📱 Responsive design using **Bootstrap**

---

## 📁 Table Fields

Each section contains a table with the following columns:

- **Name**
- **Description**
- **Price**
- **Currency**
- **Status**
- **Actions** (Lock/Unlock, Delete)

---

## 🛠️ Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript**
- **jQuery**
- **Bootstrap 5**

---

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/NaelSaleh98/MarriageJourney.git
```

### 2. Launch the Site

Open `index.html` in your preferred browser, or use a local server like [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in VS Code for a better development experience.

---

## 📂 Folder Structure

```bash
marriage-journey/
├── assets/						# Contains all assets (CSS, JS, images)
│   ├── css/					# CSS files
│   │   ├── engagement.css		# Styles for Engagement section
│   │   ├── home.css			# Styles for Home section
│   │   ├── marriage.css			# Styles for Marriage section
│   │   └── styles.css			# Main stylesheet
│   ├── images/					# Images used in the project
│   └── js/						# JavaScript files
│       ├── engagement.js		# JS for Engagement section
│       ├── home.js				# JS for Home section
│       ├── marriage.js			# JS for Marriage section
│       └── main.js				# Main JavaScript file
├── components/					# Reusable components
│   ├── data-table.js			# Data table component
│   ├── my-footer.js			# Footer component
│   └── my-header.js			# Header component
├── pages/						# HTML pages
│   ├── contact.html			# Contact page
│   ├── engagement.html			# Engagement section page
│   ├── home.html				# Home section page
│   ├── marriage.html			# Marriage section page
│   ├── privacy.html			# Privacy policy page
│   └── terms.html				# Terms and conditions page
├── .gitignore					# Git ignore file
├── CODE_OF_CONDUCT.md			# Code of Conduct for contributors
├── favicon.ico					# Favicon for the site
├── index.html					# Home page with navigation tabs
└── README.md					# Project documentation
```

---

## ✅ To-Do / Future Improvements

- Add support for data export/import (e.g., JSON or CSV)
- Enable multi-language support (English/Arabic)
- Add sorting and filtering options for tables
- Add row reordering functionality

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).  
Feel free to use, modify, and share it!

---

## 🤝 Contributing

We welcome contributions! If you’d like to help improve the project:

1. Fork the repo
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes
4. Push to your fork
5. Submit a pull request

Please make sure to read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

## 📬 Contact

For questions, suggestions, or collaboration inquiries:

📧 **example@email.com**

---

## ⭐ Show Your Support

If you find this project helpful, please give it a ⭐ on GitHub and share it with others!

---

> Built with 💙 to support one of life’s most important journeys.