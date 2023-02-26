# Kam na mal'co 🤔

*káːm ŋàː màːldzɔ̀ː*

Simple dashboard for seeing all the snack/lunch options in one place.

It is comprised of two parts: [Scrapper](#scrapper) and [Web frontend](#web-frontend).

### Scrapper

This is a simple Python script (for now) that scraps data from different restaurants and sends it to the database.

Using [Supabase](https://supabase.com/) and [supabase-py](https://github.com/supabase-community/supabase-py) for interfacing with Python.

### Web frontend

A Svelte app running on Netlify: [https://kamnamalco.netlify.app/](https://kamnamalco.netlify.app/).

It reads the database values and display them all on a single page, grouped by restaurants.

## Remarks

Currently, the scrapper has to be run manually. A big improvmenet would be to have it ran automatically. [Netlify Functions](https://docs.netlify.com/functions/overview/) are an option, but they currently don't support Python (only JS/TS and Go).

Scarpper have to be written for each restaurant separately. There is a lot of room for improvment here, namely, adding more restaurants/scrappers.

The UI is in Slovene only.

## Improvement ideas

- Login system
- Favourite restaurant/meal
- Location features
- Cost analysis and food restaurant statistics
- ML predictions
- Option to add new scrappers dynamically (via UI or otherwise)