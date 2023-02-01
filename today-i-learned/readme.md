# Today I Learned demo app

This is a project built during the Complete WebDev Crash Course presented by [Jonas Schmedtmann](https://twitter.com/jonasschmedtman), accessed on Udemy.

The project was built in React 18, with Vite 4, and using a free tier database of [Supabase](https://supabase.com/). The code is rather simple, kept in one file, serves the purpose of a learning project perfectly. It utilises ES6 imports for external libraries, but components are kept in App.js. Data is being kept in sync using the Supabase database, so data is persistent.

#### The app is a dashboard/drawer/data source of interesting ideas that you would like to rememeber and have written down. It is a collection facts, that can be filtered and voted on. Facts can also be added manually to extend the database.

A live demo is available at this [URL](https://today-i-learned-demo-agnar.netlify.app/).

### Usage

- Open the app and browse through the facts available already
- Vote on the facts if you want, choose Great, Mindblowing, or False
- Fact list can be filtered using the provided buttons
- A new fact can be easily added using the Share Fact button, simply add text, a link to the source and choose a category
