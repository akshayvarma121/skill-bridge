def recommend_internships(user_profile: dict, internships_data: list):
    """
    Return top 3 internships based on skills and location matching
    """
    scored = []

    user_skills = set([skill.lower() for skill in user_profile.get("skills", [])])
    user_location = user_profile.get("location", "").lower()

    for internship in internships_data:
        internship_skills = set([skill.lower() for skill in internship.get("skills_required", [])])
        skill_score = len(user_skills & internship_skills) / len(internship_skills) if internship_skills else 0
        loc_score = 1.0 if user_location in internship.get("location", "").lower() else 0.5
        match_score = 0.7 * skill_score + 0.3 * loc_score
        internship_copy = internship.copy()
        internship_copy["match_percentage"] = round(match_score, 2)
        scored.append(internship_copy)

    # Sort descending and return top 3
    scored.sort(key=lambda x: x["match_percentage"], reverse=True)
    return scored[:3]
