import 'package:sole_mobile/app/shared/models/query.dart';

class QueryStatus {
  final int total;
  final int pages;
  final List<String> links;
  final String query;
  final Query data;

  QueryStatus(this.total, this.pages, this.links, this.query, this.data);

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'total': total});
    result.addAll({'pages': pages});
    result.addAll({'links': links});
    result.addAll({'query': query});
    result.addAll({'data': data.toMap()});

    return result;
  }

  factory QueryStatus.fromMap(Map<String, dynamic> map) {
    return QueryStatus(
      map['total']?.toInt() ?? 0,
      map['pages']?.toInt() ?? 0,
      List<String>.from(map['links']),
      map['query'] ?? '',
      Query.fromMap(map['data']),
    );
  }
}
