import sys, json

if __name__ == "__main__":
    try:
        args = json.loads(sys.argv[1])
    except:
        raise Exception("error while loading argument")

    transcription = args['transcription']

    #transcription = "Paciente apresenta quadro de diabetes e relata estar tomando amoxilina. Procedimento padrão aplicado e pedido hemograma completo."

    tags = [
        { "name": "Diabetes", "type": "Condition" },
        { "name": "Amoxilina", "type": "Substance" },
        { "name": "Hemograma completo", "type": "Procedure" }
    ]

    highlightedTranscription = [
        { "words": "Paciente apresenta quadro de ", "category": ""},
        { "words": "diabetes", "category": "condition"},
        { "words": "e relata estar tomando ", "category": ""},
        { "words": "amoxilina", "category": "medicine"},
        { "words": ". Procedimento padrão aplicado e pedido um ", "category": ""},
        { "words": "hemograma completo", "category": "procedure"},
        { "words": ".", "category": ""}
    ]

    structuredData = {
        "conditions": ["diabetes"],
        "substances": {
            "medicines": ["amoxilina"],
            "other": []
        },
        "procedures": {
            "imagingExams": [],
            "laboratoryTests": ["hemograma completo"]
        }
    }

    returnJSON = {
        "title": "Summarization #001",
        "transcription": transcription,
        "audioPath": args['audioPath'],
        "insights": {
            "tags": tags,
            "highlightedTranscription": highlightedTranscription,
            "structuredData": structuredData
        }
    }

    print(json.dumps(returnJSON))
    sys.stdout.flush()