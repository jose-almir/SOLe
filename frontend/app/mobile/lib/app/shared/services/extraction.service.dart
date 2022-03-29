import 'package:dio/dio.dart';
import 'package:sole_mobile/app/shared/models/extraction_results.dart';
import 'package:sole_mobile/app/shared/models/query.dart';
import 'package:sole_mobile/app/shared/models/query_status.dart';

class ExtractionService {
  final Dio _dio;
  ExtractionService(this._dio);

  Future<QueryStatus> status(Query query) async {
    final response = await _dio.post<Map<String, dynamic>>(
      'api/status',
      data: query.toMap(),
    );
    final status = QueryStatus.fromMap(response.data!);
    return status;
  }

  Future<ExtractionResults> extract(String link) async {
    final response = await _dio.post<Map<String, dynamic>>(
      'api/extract',
      data: {'link': link},
    );
    final results = ExtractionResults.fromMap(response.data!);

    return results;
  }
}
