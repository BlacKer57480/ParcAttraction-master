import request.request as req

def add_attraction(data):
    print(data, flush=True)
    if (not "nom" in data or data["nom"] == ""):
        return False
    
    if (not "description" in data or data["description"] == ""):
        return False

    if (not "difficulte" in data or data["difficulte"] is None):
        return False

    if (not "visible" in data):
        data["visible"] = True

    if ("attraction_id" in data and data["attraction_id"]):
      requete = f"UPDATE attraction SET nom='{data['nom']}', description='{data['description']}', difficulte={data['difficulte']}, visible={data['visible']} WHERE attraction_id = {data['attraction_id']}"
      req.insert_in_db(requete)
      id = data['attraction_id']
    else:
      requete = "INSERT INTO attraction (nom, description, difficulte, visible) VALUES (?, ?, ?, ?);"
      id = req.insert_in_db(requete, (data["nom"], data["description"], data["difficulte"], data["visible"]))

    return id

def get_all_attraction():
    json = req.select_from_db("SELECT * FROM attraction")
    
    return json
  
def add_critique(id, data):
    if (not id):
        return False

    if (not "note" in data or data["note"] is None):
        return False

    if (not "commentaire" in data or data["commentaire"] == ""):
        return False
    
    if ("commentaire" in data and len(data["commentaire"]) > 3000):
        return False

    requete = "INSERT INTO critique (nom, prenom, note, commentaire, attraction_id) VALUES (?, ?, ?, ?, ?);"
    req.insert_in_db(requete, (data["nom"], data["prenom"], data["note"], data["commentaire"], id))

    return True
  
def get_attraction_critique(id):
    if (not id):
        return False

    json = req.select_from_db("SELECT * FROM critique WHERE attraction_id = ?", (id,))

    return json

def get_all_attraction_visible():
    json = req.select_from_db("SELECT * FROM attraction WHERE visible = true")
    
    return json

def get_attraction(id):
    if (not id):
        return False

    json = req.select_from_db("SELECT * FROM attraction WHERE attraction_id = ?", (id,))

    if len(json) > 0:
        return json[0]
    else:
        return []

def delete_attraction(id):
    if (not id):
        return False

    req.delete_from_db("DELETE FROM attraction WHERE attraction_id = ?", (id,))

    return True