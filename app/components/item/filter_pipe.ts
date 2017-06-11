import { Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {

    transform(list: any[], filterByField: string, filterValue: string): any {

        if (!filterByField || !filterValue) {
            return list;
        }

        return list.filter(item => {
            const field = item[filterByField].toLowerCase();
            const filter = filterValue.toLocaleLowerCase();
            return field.indexOf(filter) >= 0;
        });
    }
}

@Pipe({ name: 'myCurrencyPipe'})
export class MyCurrencyPipe implements PipeTransform{
   
  transform(val:any) {

        if(isNaN(val)){
                 var num1='';
                 return num1;
            }
        val = val.toString().replace(/[^0-9.]/g, '');
        if (val === '') return '';
        var value = parseFloat(val);
        var num = '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        return num;

        //another one
        // var formatter = new Intl.NumberFormat('en-US', {
        //     style: 'currency',
        //     currency: 'USD',
        //     minimumFractionDigits: 2,
        //     });
        //     var num= formatter.format(val);
        //     return num;
        //another one
        // var num = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
        //  return num;

  } 

}

@Pipe({ name: 'numberPipe'})
export class NumberPipe implements PipeTransform{

    transform(val:any) {

       var phoneTest = new RegExp(/^((\+1)|1)? ?\(?(\d{3})\)?[ .-]?(\d{3})[ .-]?(\d{4})( ?(ext\.? ?|x)(\d*))?$/);
       var phone = val;
        phone = phone.trim();
        var results = phoneTest.exec(phone);
        if (results !== null && results.length > 8) {

            return "(" + results[3] + ") " + results[4] + "-" + results[5] + (typeof results[8] !== "undefined" ? " x" + results[8] : "");

        }
    }
}
