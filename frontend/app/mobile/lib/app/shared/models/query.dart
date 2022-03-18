class Query {
  final String query;
  final String fromDay;
  final String fromMonth;
  final String fromYear;
  final String toDay;
  final String toMonth;
  final String toYear;
  final List langs;

  Query(
    this.query,
    this.fromDay,
    this.fromMonth,
    this.fromYear,
    this.toDay,
    this.toMonth,
    this.toYear,
    this.langs,
  );

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'query': query});
    result.addAll({'fromDay': fromDay});
    result.addAll({'fromMonth': fromMonth});
    result.addAll({'fromYear': fromYear});
    result.addAll({'toDay': toDay});
    result.addAll({'toMonth': toMonth});
    result.addAll({'toYear': toYear});
    result.addAll({'langs': langs});

    return result;
  }

  factory Query.fromMap(Map<String, dynamic> map) {
    return Query(
      map['query'] ?? '',
      map['fromDay'] ?? '',
      map['fromMonth'] ?? '',
      map['fromYear'] ?? '',
      map['toDay'] ?? '',
      map['toMonth'] ?? '',
      map['toYear'] ?? '',
      List.from(map['langs']),
    );
  }
}
