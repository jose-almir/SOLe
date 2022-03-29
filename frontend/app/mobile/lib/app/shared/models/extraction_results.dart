class ExtractionResults {
  final List<String> references;

  ExtractionResults(this.references);

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'references': references});

    return result;
  }

  factory ExtractionResults.fromMap(Map<String, dynamic> map) {
    return ExtractionResults(
      List<String>.from(map['references']),
    );
  }
}
