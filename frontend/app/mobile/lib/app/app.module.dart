import 'package:dio/dio.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:sole_mobile/app/home/home.controller.dart';
import 'package:sole_mobile/app/home/home.widget.dart';
import 'package:sole_mobile/app/shared/config/dio.dart';
import 'package:sole_mobile/app/shared/services/extraction.service.dart';

class AppModule extends Module {
  @override
  List<Bind> get binds => [
        Bind.singleton((i) => Dio(config)),
        Bind.singleton((i) => ExtractionService(i())),
        Bind.singleton((i) => HomeController(i())),
      ];

  @override
  List<ModularRoute> get routes => [
        ChildRoute('/', child: (_, args) => const HomeWidget()),
      ];
}
