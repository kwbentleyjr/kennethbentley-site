#!/usr/bin/env python3

import json

EVENTS_FILE = "events.json"


def get_event():
    print()
    print("New Event")
    print("---------")

    event = {
        "date": input("Date (YYYY-MM-DD): ").strip(),
        "time": input("Time: ").strip(),
        "artist": input("Artist: ").strip(),
        "city": input("City: ").strip(),
        "venue": input("Venue: ").strip(),
        "country": input("Country: ").strip(),
        "details": input("Details: ").strip(),
        "link": input("Link (optional): ").strip()
    }

    return event


def main():
    with open(EVENTS_FILE, "r", encoding="utf-8") as file:
        events = json.load(file)

    while True:
        event = get_event()
        events.append(event)

        print()
        another = input("Add another event? (y/n): ").strip().lower()

        if another != "y":
            break

    events.sort(key=lambda event: event["date"])

    with open(EVENTS_FILE, "w", encoding="utf-8") as file:
        json.dump(events, file, indent=2, ensure_ascii=False)

    print()
    print("events.json updated successfully.")


if __name__ == "__main__":
    main()