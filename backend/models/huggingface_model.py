# models/huggingface_model.py

import torch
from transformers import AutoTokenizer, AutoModelForMaskedLM

# Load the fine-tuned model and tokenizer for code analysis
# Specify `from_tf=True` to load TensorFlow weights
tokenizer = AutoTokenizer.from_pretrained("JasperGrant/ASTBERT-gb-25k-methods")
model = AutoModelForMaskedLM.from_pretrained("JasperGrant/ASTBERT-gb-25k-methods", from_tf=True)

# Make sure the model is in eval mode
model.eval()

def compare_code_snippets(code_snippet1, code_snippet2):
    """
    Function to compare two code snippets using the fine-tuned Hugging Face model.
    Returns a similarity score between the two snippets (higher score indicates higher similarity).
    """

    # Tokenize both input code snippets
    inputs1 = tokenizer(code_snippet1, return_tensors="pt", padding=True, truncation=True)
    inputs2 = tokenizer(code_snippet2, return_tensors="pt", padding=True, truncation=True)

    # Perform inference on both snippets
    with torch.no_grad():
        outputs1 = model(**inputs1)
        outputs2 = model(**inputs2)

    # Extract logits (the raw predictions from the model) for both code snippets
    logits1 = outputs1.logits
    logits2 = outputs2.logits

    # Calculate a similarity score between the two sets of logits
    similarity_score = torch.cosine_similarity(logits1.mean(dim=1), logits2.mean(dim=1), dim=-1).item()

    return similarity_score

def detect_plagiarism(code_snippet, reference_code_list, threshold=0.8):
    """
    Function to detect plagiarism by comparing a given code snippet with a list of reference code snippets.
    Returns whether the given code snippet is plagiarized based on a similarity threshold.
    """

    for reference_code in reference_code_list:
        similarity_score = compare_code_snippets(code_snippet, reference_code)
        
        # If similarity score exceeds the threshold, mark it as plagiarized
        if similarity_score >= threshold:
            return True, similarity_score  # Plagiarized, return True and the similarity score

    return False, 0.0  # Not plagiarized, return False and 0 score

def detect_ai_generated_code(code_snippet, ai_code_list, threshold=0.85):
    """
    Function to detect AI-generated code by comparing the given snippet with known AI-generated code samples.
    Returns True if the similarity exceeds the threshold, indicating AI-generated content.
    """

    for ai_code in ai_code_list:
        similarity_score = compare_code_snippets(code_snippet, ai_code)
        
        # If the similarity score exceeds the threshold, classify it as AI-generated
        if similarity_score >= threshold:
            return True, similarity_score  # AI-generated, return True and the similarity score
    
    return False, 0.0  # Not AI-generated, return False and 0 score
