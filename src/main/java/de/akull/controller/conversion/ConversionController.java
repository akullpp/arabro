package de.akull.controller.conversion;

import de.akull.service.NumeralService;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
@RequestMapping("api/v1/conversion")
@Api("Conversion of Arabic numerals to Roman numerals")
public class ConversionController {

    private NumeralService numeralService;

    @Autowired
    public ConversionController(NumeralService numeralService) {
        this.numeralService = numeralService;
    }

    @RequestMapping(method = POST)
    public Resource<ConversionResponse> convert(@Valid @RequestBody ConversionRequest conversionRequest) {
        Integer n = conversionRequest.getNumber();

        return new Resource<>(
                ConversionMapper.mapToResponse(
                        n,
                        NumeralService.toRoman(n),
                        numeralService.isPrime(n)
                ),
                linkTo(methodOn(ConversionController.class).convert(conversionRequest)).withSelfRel()
        );
    }
}
