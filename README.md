# Scaffold

Project template scaffolding built for Trysts.

## Usage

```
npx @trysts/scaffold [options]
```

## Examples

Scaffolding a basic `nodejs` service:

```
npx @trysts/scaffold --name product
```

Scaffolding a `nodejs` with `mongodb` integration:

```
npx @trysts/scaffold --name product --w-mongo
```

Scaffolding a `nodejs` with `kafka` integration:

```
npx @trysts/scaffold --name product --w-kafka
```

Scaffolding a `nodejs` with `mongodb` and `kafka` integration:

```
npx @trysts/scaffold --name product --w-mongo --w-kafka
```

#### Options

| Prefix      | Params           | Required         | Description                                                                                                               |
| ----------- | ---------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `--name`    | `<service_name>` | Must be one word | Naming for you backend service, require **_a word_** unless you'll get a docker complain when running `docker compose up` |
| `--w-mongo` |                  |                  | Scaffolding a service with `mongodb` integration. Can be combine with other options                                       |
| `--w-kafka` |                  |                  | Scaffolding a service with `kafka` integration                                                                            |
