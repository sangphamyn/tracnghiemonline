const express = require('express');
const app = express();
const path = require('path');
const handlebars = require('express-handlebars');
const port = Number(process.env.PORT || 3000);
const route = require('./routes');
const methodOverride = require('method-override');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

route(app);

app.engine('hbs', handlebars({
  extname: 'hbs',
  helpers: {
    sum: (a, b) => a+b,
    sub: (a, b) => a-b,
    isEqual: (a, b) => (a == b)
  }
}));


app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(methodOverride('_method'));

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));