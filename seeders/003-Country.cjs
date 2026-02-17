'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const countries = [
  {
    "code": "AF",
    "name": "Afghanistan",
    "currency": "AFN",
    "currencySymbol": "؋",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AX",
    "name": "Åland Islands",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AL",
    "name": "Albania",
    "currency": "ALL",
    "currencySymbol": "L",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "DZ",
    "name": "Algeria",
    "currency": "DZD",
    "currencySymbol": "د.ج",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AS",
    "name": "American Samoa",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AD",
    "name": "Andorra",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AO",
    "name": "Angola",
    "currency": "AOA",
    "currencySymbol": "Kz",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AI",
    "name": "Anguilla",
    "currency": "XCD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AQ",
    "name": "Antarctica",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AG",
    "name": "Antigua and Barbuda",
    "currency": "XCD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AR",
    "name": "Argentina",
    "currency": "ARS",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AM",
    "name": "Armenia",
    "currency": "AMD",
    "currencySymbol": "֏",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AW",
    "name": "Aruba",
    "currency": "AWG",
    "currencySymbol": "ƒ",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AU",
    "name": "Australia",
    "currency": "AUD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AT",
    "name": "Austria",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AZ",
    "name": "Azerbaijan",
    "currency": "AZN",
    "currencySymbol": "₼",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BS",
    "name": "Bahamas",
    "currency": "BSD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BH",
    "name": "Bahrain",
    "currency": "BHD",
    "currencySymbol": ".د.ب",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BD",
    "name": "Bangladesh",
    "currency": "BDT",
    "currencySymbol": "৳",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BB",
    "name": "Barbados",
    "currency": "BBD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BY",
    "name": "Belarus",
    "currency": "BYN",
    "currencySymbol": "Br",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BE",
    "name": "Belgium",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BZ",
    "name": "Belize",
    "currency": "BZD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BJ",
    "name": "Benin",
    "currency": "XOF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BM",
    "name": "Bermuda",
    "currency": "BMD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BT",
    "name": "Bhutan",
    "currency": "BTN",
    "currencySymbol": "Nu.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BO",
    "name": "Bolivia",
    "currency": "BOB",
    "currencySymbol": "Bs.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BA",
    "name": "Bosnia and Herzegovina",
    "currency": "BAM",
    "currencySymbol": "KM",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BW",
    "name": "Botswana",
    "currency": "BWP",
    "currencySymbol": "P",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BV",
    "name": "Bouvet Island",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BR",
    "name": "Brazil",
    "currency": "BRL",
    "currencySymbol": "R$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IO",
    "name": "British Indian Ocean Territory",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "VG",
    "name": "British Virgin Islands",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BN",
    "name": "Brunei",
    "currency": "BND",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BG",
    "name": "Bulgaria",
    "currency": "BGN",
    "currencySymbol": "лв",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BF",
    "name": "Burkina Faso",
    "currency": "XOF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BI",
    "name": "Burundi",
    "currency": "BIF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KH",
    "name": "Cambodia",
    "currency": "KHR",
    "currencySymbol": "៛",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CM",
    "name": "Cameroon",
    "currency": "XAF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CA",
    "name": "Canada",
    "currency": "CAD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CV",
    "name": "Cape Verde",
    "currency": "CVE",
    "currencySymbol": "Esc",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BQ",
    "name": "Caribbean Netherlands",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KY",
    "name": "Cayman Islands",
    "currency": "KYD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CF",
    "name": "Central African Republic",
    "currency": "XAF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TD",
    "name": "Chad",
    "currency": "XAF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CL",
    "name": "Chile",
    "currency": "CLP",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CN",
    "name": "China",
    "currency": "CNY",
    "currencySymbol": "¥",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CX",
    "name": "Christmas Island",
    "currency": "AUD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CC",
    "name": "Cocos (Keeling) Islands",
    "currency": "AUD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CO",
    "name": "Colombia",
    "currency": "COP",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KM",
    "name": "Comoros",
    "currency": "KMF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CG",
    "name": "Congo",
    "currency": "XAF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CK",
    "name": "Cook Islands",
    "currency": "CKD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CR",
    "name": "Costa Rica",
    "currency": "CRC",
    "currencySymbol": "₡",
    "status": true,
    "allowRegister": true,
    "allowBusiness": true
  },
  {
    "code": "HR",
    "name": "Croatia",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CU",
    "name": "Cuba",
    "currency": "CUC",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CW",
    "name": "Curaçao",
    "currency": "ANG",
    "currencySymbol": "ƒ",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CY",
    "name": "Cyprus",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CZ",
    "name": "Czechia",
    "currency": "CZK",
    "currencySymbol": "Kč",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "DK",
    "name": "Denmark",
    "currency": "DKK",
    "currencySymbol": "kr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "DJ",
    "name": "Djibouti",
    "currency": "DJF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "DM",
    "name": "Dominica",
    "currency": "XCD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "DO",
    "name": "Dominican Republic",
    "currency": "DOP",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CD",
    "name": "DR Congo",
    "currency": "CDF",
    "currencySymbol": "FC",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "EC",
    "name": "Ecuador",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "EG",
    "name": "Egypt",
    "currency": "EGP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SV",
    "name": "El Salvador",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GQ",
    "name": "Equatorial Guinea",
    "currency": "XAF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ER",
    "name": "Eritrea",
    "currency": "ERN",
    "currencySymbol": "Nfk",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "EE",
    "name": "Estonia",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SZ",
    "name": "Eswatini",
    "currency": "SZL",
    "currencySymbol": "L",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ET",
    "name": "Ethiopia",
    "currency": "ETB",
    "currencySymbol": "Br",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "FK",
    "name": "Falkland Islands",
    "currency": "FKP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "FO",
    "name": "Faroe Islands",
    "currency": "DKK",
    "currencySymbol": "kr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "FJ",
    "name": "Fiji",
    "currency": "FJD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "FI",
    "name": "Finland",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "FR",
    "name": "France",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GF",
    "name": "French Guiana",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PF",
    "name": "French Polynesia",
    "currency": "XPF",
    "currencySymbol": "₣",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TF",
    "name": "French Southern and Antarctic Lands",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GA",
    "name": "Gabon",
    "currency": "XAF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GM",
    "name": "Gambia",
    "currency": "GMD",
    "currencySymbol": "D",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GE",
    "name": "Georgia",
    "currency": "GEL",
    "currencySymbol": "₾",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "DE",
    "name": "Germany",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GH",
    "name": "Ghana",
    "currency": "GHS",
    "currencySymbol": "₵",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GI",
    "name": "Gibraltar",
    "currency": "GIP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GR",
    "name": "Greece",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GL",
    "name": "Greenland",
    "currency": "DKK",
    "currencySymbol": "kr.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GD",
    "name": "Grenada",
    "currency": "XCD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GP",
    "name": "Guadeloupe",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GU",
    "name": "Guam",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GT",
    "name": "Guatemala",
    "currency": "GTQ",
    "currencySymbol": "Q",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GG",
    "name": "Guernsey",
    "currency": "GBP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GN",
    "name": "Guinea",
    "currency": "GNF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GW",
    "name": "Guinea-Bissau",
    "currency": "XOF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GY",
    "name": "Guyana",
    "currency": "GYD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "HT",
    "name": "Haiti",
    "currency": "HTG",
    "currencySymbol": "G",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "HM",
    "name": "Heard Island and McDonald Islands",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "HN",
    "name": "Honduras",
    "currency": "HNL",
    "currencySymbol": "L",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "HK",
    "name": "Hong Kong",
    "currency": "HKD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "HU",
    "name": "Hungary",
    "currency": "HUF",
    "currencySymbol": "Ft",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IS",
    "name": "Iceland",
    "currency": "ISK",
    "currencySymbol": "kr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IN",
    "name": "India",
    "currency": "INR",
    "currencySymbol": "₹",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ID",
    "name": "Indonesia",
    "currency": "IDR",
    "currencySymbol": "Rp",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IR",
    "name": "Iran",
    "currency": "IRR",
    "currencySymbol": "﷼",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IQ",
    "name": "Iraq",
    "currency": "IQD",
    "currencySymbol": "ع.د",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IE",
    "name": "Ireland",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IM",
    "name": "Isle of Man",
    "currency": "GBP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IL",
    "name": "Israel",
    "currency": "ILS",
    "currencySymbol": "₪",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "IT",
    "name": "Italy",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CI",
    "name": "Ivory Coast",
    "currency": "XOF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "JM",
    "name": "Jamaica",
    "currency": "JMD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "JP",
    "name": "Japan",
    "currency": "JPY",
    "currencySymbol": "¥",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "JE",
    "name": "Jersey",
    "currency": "GBP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "JO",
    "name": "Jordan",
    "currency": "JOD",
    "currencySymbol": "د.ا",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KZ",
    "name": "Kazakhstan",
    "currency": "KZT",
    "currencySymbol": "₸",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KE",
    "name": "Kenya",
    "currency": "KES",
    "currencySymbol": "Sh",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KI",
    "name": "Kiribati",
    "currency": "AUD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "XK",
    "name": "Kosovo",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KW",
    "name": "Kuwait",
    "currency": "KWD",
    "currencySymbol": "د.ك",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KG",
    "name": "Kyrgyzstan",
    "currency": "KGS",
    "currencySymbol": "с",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LA",
    "name": "Laos",
    "currency": "LAK",
    "currencySymbol": "₭",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LV",
    "name": "Latvia",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LB",
    "name": "Lebanon",
    "currency": "LBP",
    "currencySymbol": "ل.ل",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LS",
    "name": "Lesotho",
    "currency": "LSL",
    "currencySymbol": "L",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LR",
    "name": "Liberia",
    "currency": "LRD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LY",
    "name": "Libya",
    "currency": "LYD",
    "currencySymbol": "ل.د",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LI",
    "name": "Liechtenstein",
    "currency": "CHF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LT",
    "name": "Lithuania",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LU",
    "name": "Luxembourg",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MO",
    "name": "Macau",
    "currency": "MOP",
    "currencySymbol": "P",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MG",
    "name": "Madagascar",
    "currency": "MGA",
    "currencySymbol": "Ar",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MW",
    "name": "Malawi",
    "currency": "MWK",
    "currencySymbol": "MK",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MY",
    "name": "Malaysia",
    "currency": "MYR",
    "currencySymbol": "RM",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MV",
    "name": "Maldives",
    "currency": "MVR",
    "currencySymbol": ".ރ",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ML",
    "name": "Mali",
    "currency": "XOF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MT",
    "name": "Malta",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MH",
    "name": "Marshall Islands",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MQ",
    "name": "Martinique",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MR",
    "name": "Mauritania",
    "currency": "MRU",
    "currencySymbol": "UM",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MU",
    "name": "Mauritius",
    "currency": "MUR",
    "currencySymbol": "₨",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "YT",
    "name": "Mayotte",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MX",
    "name": "Mexico",
    "currency": "MXN",
    "currencySymbol": "$",
    "status": true,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "FM",
    "name": "Micronesia",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MD",
    "name": "Moldova",
    "currency": "MDL",
    "currencySymbol": "L",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MC",
    "name": "Monaco",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MN",
    "name": "Mongolia",
    "currency": "MNT",
    "currencySymbol": "₮",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ME",
    "name": "Montenegro",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MS",
    "name": "Montserrat",
    "currency": "XCD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MA",
    "name": "Morocco",
    "currency": "MAD",
    "currencySymbol": "د.م.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MZ",
    "name": "Mozambique",
    "currency": "MZN",
    "currencySymbol": "MT",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MM",
    "name": "Myanmar",
    "currency": "MMK",
    "currencySymbol": "Ks",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NA",
    "name": "Namibia",
    "currency": "NAD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NR",
    "name": "Nauru",
    "currency": "AUD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NP",
    "name": "Nepal",
    "currency": "NPR",
    "currencySymbol": "₨",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NL",
    "name": "Netherlands",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NC",
    "name": "New Caledonia",
    "currency": "XPF",
    "currencySymbol": "₣",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NZ",
    "name": "New Zealand",
    "currency": "NZD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NI",
    "name": "Nicaragua",
    "currency": "NIO",
    "currencySymbol": "C$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NE",
    "name": "Niger",
    "currency": "XOF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NG",
    "name": "Nigeria",
    "currency": "NGN",
    "currencySymbol": "₦",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NU",
    "name": "Niue",
    "currency": "NZD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NF",
    "name": "Norfolk Island",
    "currency": "AUD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KP",
    "name": "North Korea",
    "currency": "KPW",
    "currencySymbol": "₩",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MK",
    "name": "North Macedonia",
    "currency": "MKD",
    "currencySymbol": "den",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MP",
    "name": "Northern Mariana Islands",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "NO",
    "name": "Norway",
    "currency": "NOK",
    "currencySymbol": "kr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "OM",
    "name": "Oman",
    "currency": "OMR",
    "currencySymbol": "ر.ع.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PK",
    "name": "Pakistan",
    "currency": "PKR",
    "currencySymbol": "₨",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PW",
    "name": "Palau",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PS",
    "name": "Palestine",
    "currency": "EGP",
    "currencySymbol": "E£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PA",
    "name": "Panama",
    "currency": "PAB",
    "currencySymbol": "B/.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PG",
    "name": "Papua New Guinea",
    "currency": "PGK",
    "currencySymbol": "K",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PY",
    "name": "Paraguay",
    "currency": "PYG",
    "currencySymbol": "₲",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PE",
    "name": "Peru",
    "currency": "PEN",
    "currencySymbol": "S/.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PH",
    "name": "Philippines",
    "currency": "PHP",
    "currencySymbol": "₱",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PN",
    "name": "Pitcairn Islands",
    "currency": "NZD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PL",
    "name": "Poland",
    "currency": "PLN",
    "currencySymbol": "zł",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PT",
    "name": "Portugal",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PR",
    "name": "Puerto Rico",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "QA",
    "name": "Qatar",
    "currency": "QAR",
    "currencySymbol": "ر.ق",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "RE",
    "name": "Réunion",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "RO",
    "name": "Romania",
    "currency": "RON",
    "currencySymbol": "lei",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "RU",
    "name": "Russia",
    "currency": "RUB",
    "currencySymbol": "₽",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "RW",
    "name": "Rwanda",
    "currency": "RWF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "BL",
    "name": "Saint Barthélemy",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SH",
    "name": "Saint Helena, Ascension and Tristan da Cunha",
    "currency": "GBP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KN",
    "name": "Saint Kitts and Nevis",
    "currency": "XCD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LC",
    "name": "Saint Lucia",
    "currency": "XCD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "MF",
    "name": "Saint Martin",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "PM",
    "name": "Saint Pierre and Miquelon",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "VC",
    "name": "Saint Vincent and the Grenadines",
    "currency": "XCD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "WS",
    "name": "Samoa",
    "currency": "WST",
    "currencySymbol": "T",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SM",
    "name": "San Marino",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ST",
    "name": "São Tomé and Príncipe",
    "currency": "STN",
    "currencySymbol": "Db",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SA",
    "name": "Saudi Arabia",
    "currency": "SAR",
    "currencySymbol": "ر.س",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SN",
    "name": "Senegal",
    "currency": "XOF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "RS",
    "name": "Serbia",
    "currency": "RSD",
    "currencySymbol": "дин.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SC",
    "name": "Seychelles",
    "currency": "SCR",
    "currencySymbol": "₨",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SL",
    "name": "Sierra Leone",
    "currency": "SLL",
    "currencySymbol": "Le",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SG",
    "name": "Singapore",
    "currency": "SGD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SX",
    "name": "Sint Maarten",
    "currency": "ANG",
    "currencySymbol": "ƒ",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SK",
    "name": "Slovakia",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SI",
    "name": "Slovenia",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SB",
    "name": "Solomon Islands",
    "currency": "SBD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SO",
    "name": "Somalia",
    "currency": "SOS",
    "currencySymbol": "Sh",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ZA",
    "name": "South Africa",
    "currency": "ZAR",
    "currencySymbol": "R",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GS",
    "name": "South Georgia",
    "currency": "SHP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "KR",
    "name": "South Korea",
    "currency": "KRW",
    "currencySymbol": "₩",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SS",
    "name": "South Sudan",
    "currency": "SSP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ES",
    "name": "Spain",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "LK",
    "name": "Sri Lanka",
    "currency": "LKR",
    "currencySymbol": "Rs රු",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SD",
    "name": "Sudan",
    "currency": "SDG",
    "currencySymbol": "PT",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SR",
    "name": "Suriname",
    "currency": "SRD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SJ",
    "name": "Svalbard and Jan Mayen",
    "currency": "NOK",
    "currencySymbol": "kr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SE",
    "name": "Sweden",
    "currency": "SEK",
    "currencySymbol": "kr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "CH",
    "name": "Switzerland",
    "currency": "CHF",
    "currencySymbol": "Fr.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "SY",
    "name": "Syria",
    "currency": "SYP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TW",
    "name": "Taiwan",
    "currency": "TWD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TJ",
    "name": "Tajikistan",
    "currency": "TJS",
    "currencySymbol": "ЅМ",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TZ",
    "name": "Tanzania",
    "currency": "TZS",
    "currencySymbol": "Sh",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TH",
    "name": "Thailand",
    "currency": "THB",
    "currencySymbol": "฿",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TL",
    "name": "Timor-Leste",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TG",
    "name": "Togo",
    "currency": "XOF",
    "currencySymbol": "Fr",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TK",
    "name": "Tokelau",
    "currency": "NZD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TO",
    "name": "Tonga",
    "currency": "TOP",
    "currencySymbol": "T$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TT",
    "name": "Trinidad and Tobago",
    "currency": "TTD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TN",
    "name": "Tunisia",
    "currency": "TND",
    "currencySymbol": "د.ت",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TR",
    "name": "Türkiye",
    "currency": "TRY",
    "currencySymbol": "₺",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TM",
    "name": "Turkmenistan",
    "currency": "TMT",
    "currencySymbol": "m",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TC",
    "name": "Turks and Caicos Islands",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "TV",
    "name": "Tuvalu",
    "currency": "AUD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "UG",
    "name": "Uganda",
    "currency": "UGX",
    "currencySymbol": "Sh",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "UA",
    "name": "Ukraine",
    "currency": "UAH",
    "currencySymbol": "₴",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "AE",
    "name": "United Arab Emirates",
    "currency": "AED",
    "currencySymbol": "د.إ",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "GB",
    "name": "United Kingdom",
    "currency": "GBP",
    "currencySymbol": "£",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "US",
    "name": "United States",
    "currency": "USD",
    "currencySymbol": "$",
    "status": true,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "UM",
    "name": "United States Minor Outlying Islands",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "VI",
    "name": "United States Virgin Islands",
    "currency": "USD",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "UY",
    "name": "Uruguay",
    "currency": "UYU",
    "currencySymbol": "$",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "UZ",
    "name": "Uzbekistan",
    "currency": "UZS",
    "currencySymbol": "so'm",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "VU",
    "name": "Vanuatu",
    "currency": "VUV",
    "currencySymbol": "Vt",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "VA",
    "name": "Vatican City",
    "currency": "EUR",
    "currencySymbol": "€",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "VE",
    "name": "Venezuela",
    "currency": "VES",
    "currencySymbol": "Bs.S.",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "VN",
    "name": "Vietnam",
    "currency": "VND",
    "currencySymbol": "₫",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "WF",
    "name": "Wallis and Futuna",
    "currency": "XPF",
    "currencySymbol": "₣",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "EH",
    "name": "Western Sahara",
    "currency": "DZD",
    "currencySymbol": "دج",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "YE",
    "name": "Yemen",
    "currency": "YER",
    "currencySymbol": "﷼",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ZM",
    "name": "Zambia",
    "currency": "ZMW",
    "currencySymbol": "ZK",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  },
  {
    "code": "ZW",
    "name": "Zimbabwe",
    "currency": "BWP",
    "currencySymbol": "P",
    "status": false,
    "allowRegister": true,
    "allowBusiness": false
  }
];

    for (const country of countries) {
      await queryInterface.sequelize.query(
        `INSERT INTO "Country" (code, name, currency, "currencySymbol", "status", "allowRegister", "allowBusiness")
         VALUES (:code, :name, :currency, :currencySymbol, :status, :allowRegister, :allowBusiness)
         ON CONFLICT (code) DO UPDATE SET 
            name = EXCLUDED.name,
            currency = EXCLUDED.currency,
            "currencySymbol" = EXCLUDED."currencySymbol",
            "status" = EXCLUDED."status",
            "allowRegister" = EXCLUDED."allowRegister",
            "allowBusiness" = EXCLUDED."allowBusiness"`,
        { replacements: country }
      );
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Country', null, {});
  }
};
