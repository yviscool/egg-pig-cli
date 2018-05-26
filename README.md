# egg-pig-cli


## Installation

```bash
npm install -g egg-pig-cli
```

## Usage 

```hash
pig [command] [...options]
```

### generate (alias: g)


| Option | Description | Required | 
| - | :-: | -: | 
| type | file type | true | 
| name | file name | true | 
| path | path | false |

A list of available architecture components:

* controller (alias: c|co|con)  
* decorator (alias: d|de|dec)
* filter (alias: f|fi|fil|ft)
* exception (alias: e|ex|exce)
* guard (alias: gu|gua)
* interceptor (alias: i|in|int|inter)
* pipe (alias: p|pi)
* middleware (alias: m|mi|midd)


**Example usage**

```bash
pig generate controller user
pig g co user
```


