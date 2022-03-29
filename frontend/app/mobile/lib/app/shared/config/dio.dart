import 'package:dio/dio.dart';

const apiUrl = String.fromEnvironment(
  'API_URL',
  defaultValue: 'http://localhost:3000/',
);

final config = BaseOptions(
  baseUrl: apiUrl,
);
