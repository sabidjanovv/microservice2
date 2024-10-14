import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { MicroserviceOptions, Transport } from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          "amqps://gedwbsdj:5On6Wact8Y8_PN0tPMkxHeTB3QUun6Yi@goose.rmq2.cloudamqp.com/gedwbsdj",
        ],
        queue: "main_products_queue",
        queueOptions: {
          durable: false,
        },
      },
    }
  );
  app.listen();
}
bootstrap();
