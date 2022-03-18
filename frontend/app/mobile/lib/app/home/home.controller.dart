import 'package:mobx/mobx.dart';
import 'package:sole_mobile/app/shared/services/extraction.service.dart';
part 'home.controller.g.dart';

class HomeController = _HomeControllerBase with _$HomeController;

abstract class _HomeControllerBase with Store {
  final ExtractionService extractionService;

  @observable
  int counter = 0;

  _HomeControllerBase(this.extractionService);
}
