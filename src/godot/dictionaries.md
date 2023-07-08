---
title: Dictionaries
---

## Dictionaries

A GDScript Dictionary is used to store data as key: value pairs. Each key and value may be numbers, strings, or objects. Dictionaries are constructed with curly brackets.

The data is in no particular order, and we access values using their unique key.

The syntax is the same as JSON data format.

Another syntax is also supported that makes it slightly easier to manually edit the data.

Dictionaries are useful for storing game data.

The following code shows how to define dictionaries and how to use the available methods:
```py
extends Node2D

# Declare an empty dictionary object
var game = {}

func _ready():
	# Initialize a player dictionary
	var player = {
		"name": "Thor",
		"inventory": ["sword", "shield", "map"],
		"location": "Castellion",
		"energy": 67
	}
	
	if game.empty():
		# Add data to the game dictionary
		game["player"] = player
		game["score"] = 0
		game["dummy"] = null
	
	if game.has("dummy"):
		game.erase("dummy")
	
	print(game.get("dummy", "Key not found!"))
	
	if game.has_all(["player", "score"]):
		print(game["player"]["name"])
	
	player["energy"] += 1
	
	print(game.keys().size())
	print(game.size())
	print(player.values()[0])
	
	# Alternative way to initialize a dictionary
	var d = {
		a = {
			a1 = {
				a11 = 1, a12 = 2
			},
			a2 = 3
		},
		b = 1
	}
	
	# Make copies of the dictionary
	var deep_copy = d.duplicate(true)
	var shallow_copy = d.duplicate()
	print(deep_copy)
	# I expected the shallow copy to be truncated
	print(shallow_copy)
```